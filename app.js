const state = {
  data: null,
  search: "",
  sort: "build_desc",
};

const elements = {
  nationalAvg: document.getElementById("nationalAvg"),
  rateUnit: document.getElementById("rateUnit"),
  aboveCount: document.getElementById("aboveCount"),
  cityCount: document.getElementById("cityCount"),
  baseYear: document.getElementById("baseYear"),
  aboveGrid: document.getElementById("aboveGrid"),
  belowGrid: document.getElementById("belowGrid"),
  cardTemplate: document.getElementById("cardTemplate"),
  search: document.getElementById("search"),
  sort: document.getElementById("sort"),
};

const formatNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

const formatPercent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

function computeDerived(city, nationalAvg) {
  const buildSeries = city.build_rate_series;
  const rentSeries = city.rent_real_index;
  const buildLatest = buildSeries[buildSeries.length - 1];
  const rentChange = (rentSeries[rentSeries.length - 1] - rentSeries[0]) / rentSeries[0];

  return {
    ...city,
    buildLatest,
    rentChange,
    isAbove: buildLatest >= nationalAvg,
  };
}

function getNationalAverage(data) {
  if (typeof data?.meta?.national_avg_build_rate === "number") {
    return data.meta.national_avg_build_rate;
  }

  const lastValues = data.cities.map((city) => city.build_rate_series[city.build_rate_series.length - 1]);
  const total = lastValues.reduce((sum, value) => sum + value, 0);
  return total / lastValues.length;
}

function createSparkline(values, color) {
  const width = 180;
  const height = 70;
  const padding = 6;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const points = values.map((value, index) => {
    const x = padding + (index / (values.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / span) * (height - padding * 2);
    return [x, y];
  });

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point[0]},${point[1]}`)
    .join(" ");

  return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <path d="${path}" fill="none" stroke="url(#line)" stroke-width="3" stroke-linecap="round" />
      <circle cx="${points[points.length - 1][0]}" cy="${points[points.length - 1][1]}" r="4" fill="${color}" />
    </svg>
  `;
}

function createBars(values, color) {
  const width = 180;
  const height = 70;
  const padding = 6;
  const max = Math.max(...values) || 1;
  const barWidth = (width - padding * 2) / values.length;

  const bars = values
    .map((value, index) => {
      const barHeight = ((value / max) * (height - padding * 2)) || 1;
      const x = padding + index * barWidth + 2;
      const y = height - padding - barHeight;
      const w = barWidth - 4;
      return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${barHeight.toFixed(2)}" rx="2" fill="${color}" opacity="${0.2 + index / values.length * 0.6}" />`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${bars}
    </svg>
  `;
}

function renderGrid(container, cities) {
  container.innerHTML = "";
  cities.forEach((city, index) => {
    const card = elements.cardTemplate.content.cloneNode(true);
    const title = card.querySelector(".city-card__title");
    const subtitle = card.querySelector(".city-card__subtitle");
    const pill = card.querySelector(".pill");
    const metricValues = card.querySelectorAll(".metric__value");
    const buildChart = card.querySelector(".chart__svg.build");
    const rentChart = card.querySelector(".chart__svg.rent");
    const article = card.querySelector(".city-card");

    title.textContent = city.name;
    subtitle.textContent = `Population ${formatNumber.format(city.population)}`;
    pill.textContent = city.isAbove ? "Above avg" : "Below avg";

    metricValues[0].textContent = formatNumber.format(city.buildLatest);
    metricValues[1].textContent = formatPercent.format(city.rentChange);
    metricValues[1].classList.toggle("positive", city.rentChange >= 0);
    metricValues[1].classList.toggle("negative", city.rentChange < 0);

    buildChart.innerHTML = createBars(city.build_rate_series, "#1f4d4a");
    rentChart.innerHTML = createSparkline(city.rent_real_index, "#111111");

    article.style.transitionDelay = `${index * 40}ms`;
    container.appendChild(card);
  });
}

function render() {
  if (!state.data) return;

  const nationalAvg = getNationalAverage(state.data);
  const meta = state.data.meta;
  const cities = state.data.cities
    .map((city) => computeDerived(city, nationalAvg))
    .filter((city) => city.name.toLowerCase().includes(state.search));

  const sorted = cities.sort((a, b) => {
    switch (state.sort) {
      case "rent_asc":
        return a.rentChange - b.rentChange;
      case "rent_desc":
        return b.rentChange - a.rentChange;
      case "alpha":
        return a.name.localeCompare(b.name);
      case "build_desc":
      default:
        return b.buildLatest - a.buildLatest;
    }
  });

  const above = sorted.filter((city) => city.isAbove);
  const below = sorted.filter((city) => !city.isAbove);

  elements.nationalAvg.textContent = formatNumber.format(nationalAvg);
  elements.rateUnit.textContent = meta.build_rate_unit;
  elements.aboveCount.textContent = above.length;
  elements.cityCount.textContent = `of ${sorted.length} cities`;
  elements.baseYear.textContent = meta.rent_index_base_year;

  renderGrid(elements.aboveGrid, above);
  renderGrid(elements.belowGrid, below);

  requestAnimationFrame(() => document.body.classList.add("is-ready"));
}

function bindEvents() {
  elements.search.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.sort.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });
}

async function loadData() {
  const primary = await fetch("data/cities.json");
  if (primary.ok) {
    return primary.json();
  }
  const fallback = await fetch("data/cities.sample.json");
  return fallback.json();
}

async function init() {
  state.data = await loadData();
  bindEvents();
  render();
}

init();
