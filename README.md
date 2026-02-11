# Housebuilding & Rent Dashboard

A lightweight static dashboard that shows a pair of metro panels:
- Housebuilding rate (permits per 1,000 residents)
- Real-terms change in median rent (ZORI deflated by CPI-U)

## Structure
- index.html
- styles.css
- app.js
- data/cities.sample.json
- scripts/build_data.py

## Local preview
Run a local server from this folder so `fetch()` works:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

## Data pipeline
`scripts/build_data.py` pulls:
- Census Building Permits Survey metro/CBSA files (annual permits)
- ACS 5-year profile data (metro population)
- Zillow ZORI metro series (monthly rent index)
- BLS CPI-U (inflation adjustment)

It writes `data/cities.json` and filters to metros with population ≥ 100,000.

### Notes
- Use `ZORI_PATH` to point at a local Zillow ZORI CSV (for example, the metro file you shared).
- Override the default ZORI URL with `ZORI_URL` if Zillow updates file names.
- Set `BLS_API_KEY` if you have one (the public endpoint works without it for small requests).
