#!/usr/bin/env python3
import csv
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from collections import defaultdict

BPS_BASE_URL = "https://www2.census.gov/econ/bps"
BPS_METRO_DIR = "Metro (ending 2023)"
BPS_CBSA_DIR = "CBSA (beginning Jan 2024)"
BPS_YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024]

ACS_YEARS = [2018, 2019, 2020, 2021, 2022, 2023]
BASE_YEAR = BPS_YEARS[0]
POPULATION_MIN = 100_000

BLS_SERIES_ID = "CUUR0000SA0"  # CPI-U: All items, U.S. city average
ZORI_PATH = os.getenv("ZORI_PATH", "").strip()
ZORI_URL = os.getenv(
    "ZORI_URL",
    "https://files.zillowstatic.com/research/public_csvs/zori/Metro_zori_uc_sfrcondomfr_sm_month.csv",
)

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "cities.json")
CACHE_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "source")



def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def download(url, dest):
    if os.path.exists(dest):
        return dest
    print(f"Downloading {url}")
    urllib.request.urlretrieve(url, dest)
    time.sleep(0.4)
    return dest


def parse_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return 0


def parse_float(value):
    try:
        return float(value)
    except (ValueError, TypeError):
        return None


def clean_metro_display(name):
    cleaned = re.sub(r"\s+", " ", name).strip()
    if "," not in cleaned:
        parts = cleaned.split(" ")
        if len(parts) >= 2 and re.fullmatch(r"[A-Z]{2}(?:-[A-Z]{2})*", parts[-1]):
            cleaned = f"{' '.join(parts[:-1])}, {parts[-1]}"
    return cleaned


def normalize_metro_name(name):
    cleaned = clean_metro_display(name)
    cleaned = cleaned.replace("–", "-")
    cleaned = cleaned.replace(",", " ")
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned.lower()


def slugify(value):
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def metro_key(name):
    return normalize_metro_name(name)


def primary_state_from_metro(display_name):
    if "," not in display_name:
        return ""
    _, state_part = display_name.split(",", 1)
    state_part = state_part.strip()
    if not state_part:
        return ""
    return state_part.split("-")[0].strip()


def primary_city_from_metro(display_name):
    if "," in display_name:
        name_part, _ = display_name.split(",", 1)
    else:
        name_part = display_name
    name_part = name_part.strip()
    if "-" not in name_part:
        return ""
    return name_part.split("-")[0].strip()


def lookup_zori_series(display_name, zori_data):
    direct_key = metro_key(display_name)
    if direct_key in zori_data:
        return zori_data[direct_key]

    primary_state = primary_state_from_metro(display_name)
    if primary_state:
        if "," in display_name:
            name_part, _ = display_name.split(",", 1)
        else:
            name_part = display_name
        alt_name = f"{name_part.strip()}, {primary_state}"
        alt_key = metro_key(alt_name)
        if alt_key in zori_data:
            return zori_data[alt_key]

        primary_city = primary_city_from_metro(display_name)
        if primary_city:
            alt2_name = f"{primary_city}, {primary_state}"
            alt2_key = metro_key(alt2_name)
            if alt2_key in zori_data:
                return zori_data[alt2_key]

    return None


def bps_year_source(year):
    if year <= 2023:
        filename = f"ma{str(year)[2:]}12y.txt"
        url = f"{BPS_BASE_URL}/{urllib.parse.quote(BPS_METRO_DIR)}/{filename}"
    else:
        filename = f"cbsa{year}a.txt"
        url = f"{BPS_BASE_URL}/{urllib.parse.quote(BPS_CBSA_DIR)}/{filename}"

    dest = os.path.join(CACHE_DIR, "bps", str(year), filename)
    ensure_dir(os.path.dirname(dest))
    download(url, dest)
    return dest


def fetch_bps_year(year):
    source_path = bps_year_source(year)
    yearly = {}

    with open(source_path, newline="", encoding="utf-8", errors="ignore") as handle:
        reader = csv.reader(handle)
        for row in reader:
            if not row or not row[0].strip().isdigit():
                continue
            if len(row) < 16:
                continue
            cbsa_code = row[2].strip()
            name = row[4].strip()
            if not cbsa_code.isdigit() or cbsa_code in {"0", "99999"}:
                continue

            units_1 = parse_int(row[6])
            units_2 = parse_int(row[9])
            units_3 = parse_int(row[12])
            units_4 = parse_int(row[15])
            total_units = units_1 + units_2 + units_3 + units_4

            yearly[cbsa_code] = {
                "name": clean_metro_display(name),
                "total_units": total_units,
            }
    return yearly


def fetch_acs_cbsa_population(year):
    params = {
        "get": "NAME,DP05_0001E",
        "for": "metropolitan statistical area/micropolitan statistical area:*",
    }
    url = f"https://api.census.gov/data/{year}/acs/acs5/profile?{urllib.parse.urlencode(params)}"
    print(f"Fetching ACS population {year}")
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode("utf-8"))

    header = data[0]
    rows = data[1:]
    idx = {name: i for i, name in enumerate(header)}

    geo_key = "metropolitan statistical area/micropolitan statistical area"
    results = {}
    for row in rows:
        cbsa_code = row[idx[geo_key]].strip()
        population = parse_int(row[idx["DP05_0001E"]])
        results[cbsa_code] = {
            "name": row[idx["NAME"]],
            "population": population,
        }
    return results


def get_zori_source_path():
    if ZORI_PATH:
        return ZORI_PATH
    dest = os.path.join(CACHE_DIR, "zori", os.path.basename(ZORI_URL))
    ensure_dir(os.path.dirname(dest))
    download(ZORI_URL, dest)
    return dest


def fetch_zori_metro_series():
    source_path = get_zori_source_path()

    with open(source_path, newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        date_columns = [col for col in reader.fieldnames if col[:4].isdigit()]

        series = {}
        for row in reader:
            region = row.get("RegionName")
            region_type = (row.get("RegionType") or "").lower()
            if not region:
                continue
            if region_type in {"country", "state"}:
                continue

            annual_values = defaultdict(list)
            for col in date_columns:
                value = parse_float(row.get(col))
                if value is None:
                    continue
                year = int(col[:4])
                annual_values[year].append(value)

            annual = {
                year: sum(values) / len(values)
                for year, values in annual_values.items()
                if values
            }

            key = metro_key(region)
            if key not in series:
                series[key] = annual

        return series


def fetch_bls_cpi(start_year, end_year):
    api_key = os.getenv("BLS_API_KEY", "")
    url = "https://api.bls.gov/publicAPI/v2/timeseries/data/"
    payload = {
        "seriesid": [BLS_SERIES_ID],
        "startyear": str(start_year),
        "endyear": str(end_year),
    }
    if api_key:
        payload["registrationkey"] = api_key

    print("Fetching CPI data")
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as response:
        response_data = json.loads(response.read().decode("utf-8"))

    series = response_data["Results"]["series"][0]["data"]
    monthly = defaultdict(list)
    for item in series:
        period = item["period"]
        if not period.startswith("M") or period == "M13":
            continue
        year = int(item["year"])
        monthly[year].append(float(item["value"]))

    cpi_by_year = {}
    for year, values in monthly.items():
        if not values:
            continue
        cpi_by_year[year] = sum(values) / len(values)

    return cpi_by_year


def build_dataset():
    ensure_dir(CACHE_DIR)

    bps_data = {year: fetch_bps_year(year) for year in BPS_YEARS}
    acs_data = {year: fetch_acs_cbsa_population(year) for year in ACS_YEARS}
    zori_data = fetch_zori_metro_series()
    cpi_data = fetch_bls_cpi(min(BPS_YEARS), max(BPS_YEARS))

    base_cpi = cpi_data.get(BASE_YEAR)
    if not base_cpi:
        raise RuntimeError("Missing CPI data for base year")

    output = {
        "meta": {
            "build_rate_unit": "permits / 1k residents",
            "rent_index_base_year": BASE_YEAR,
            "series_years": BPS_YEARS,
        },
        "cities": [],
    }

    latest_acs_year = max(ACS_YEARS)
    latest_population = acs_data.get(latest_acs_year, {})
    common_codes = set.intersection(*[set(bps_data[year].keys()) for year in BPS_YEARS])

    for cbsa_code in sorted(common_codes):
        latest_pop = (latest_population.get(cbsa_code) or {}).get("population")
        if not latest_pop or latest_pop < POPULATION_MIN:
            continue

        build_series = []
        for year in BPS_YEARS:
            total_units = (bps_data.get(year, {}).get(cbsa_code) or {}).get("total_units")
            population = (acs_data.get(year, {}).get(cbsa_code) or {}).get("population") or latest_pop
            if not total_units or not population:
                build_series.append(None)
                continue
            build_rate = (total_units / population) * 1000
            build_series.append(round(build_rate, 2))

        if any(value is None for value in build_series):
            continue

        name_source = bps_data.get(max(BPS_YEARS), {}).get(cbsa_code) or bps_data.get(min(BPS_YEARS), {}).get(cbsa_code)
        if not name_source:
            continue
        display_name = clean_metro_display(name_source.get("name", ""))
        if not display_name:
            continue

        zori_series = lookup_zori_series(display_name, zori_data)
        if not zori_series:
            continue

        rent_real = []
        for year in BPS_YEARS:
            nominal = zori_series.get(year)
            cpi = cpi_data.get(year)
            if not nominal or not cpi:
                rent_real.append(None)
                continue
            rent_real.append(nominal / (cpi / base_cpi))

        if any(value is None for value in rent_real):
            continue

        base_value = rent_real[0]
        rent_index = [round((value / base_value) * 100, 1) for value in rent_real]

        output["cities"].append(
            {
                "id": slugify(display_name),
                "name": display_name,
                "population": latest_pop,
                "build_rate_series": build_series,
                "rent_real_index": rent_index,
            }
        )

    if not output["cities"]:
        raise RuntimeError("No cities matched after filtering")

    latest_rates = [city["build_rate_series"][-1] for city in output["cities"]]
    output["meta"]["national_avg_build_rate"] = round(sum(latest_rates) / len(latest_rates), 2)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as handle:
        json.dump(output, handle, indent=2)

    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    try:
        build_dataset()
    except Exception as exc:
        print(f"Error: {exc}")
        sys.exit(1)
