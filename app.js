const MODEL = {
  startAt: "2025-01-29T00:00:00Z",
  targetYear: 2035,
  targetValue: 78_000_000_000,
  profileExponent: 1.2,
};

const STATUS_META = {
  implemented: {
    label: "Implemented",
    priorityRank: 4,
  },
  in_progress: {
    label: "In progress",
    priorityRank: 3,
  },
  monitoring: {
    label: "Monitoring",
    priorityRank: 2,
  },
  at_risk: {
    label: "At risk",
    priorityRank: 0,
  },
  not_started: {
    label: "Not started",
    priorityRank: 1,
  },
};

const TYPE_LABEL = {
  announcement: "Announcement",
  status_change: "Status",
  deadline: "Deadline",
  monitoring: "Monitoring",
};

const POLICIES = [
  {
    id: "talent-startups",
    pillar: "Innovation",
    title: "Attract and retain world-class talent and startups",
    recommendation:
      "Harness the London-Cambridge axis to attract and retain world-class talent and startups.",
    lead: "DSIT / OxCAM Innovation Champion",
    status: "in_progress",
    progress: 46,
  },
  {
    id: "housing-transport",
    pillar: "Agglomeration",
    title: "Rapidly expand housing supply and strategic transport links",
    recommendation:
      "Deliver a rapid increase in housing supply and transport links to improve agglomeration and productivity spillovers.",
    lead: "MHCLG / DfT / National Highways",
    status: "in_progress",
    progress: 57,
  },
  {
    id: "scale-cambridge",
    pillar: "Agglomeration",
    title: "Enable a larger Cambridge urban footprint",
    recommendation:
      "Allow a larger Cambridge city footprint to unlock the critical mass effects modelled in the Growth Scenario.",
    lead: "MHCLG / Cambridge Growth Company",
    status: "in_progress",
    progress: 49,
  },
  {
    id: "crowd-in-capital",
    pillar: "Investment",
    title: "Crowd in private capital from universities and industry",
    recommendation:
      "Use policy and institutions to crowd in private investment from university investors and industry.",
    lead: "HM Treasury / DSIT",
    status: "in_progress",
    progress: 52,
  },
  {
    id: "cancer-hospital",
    pillar: "Innovation",
    title: "Build the Cambridge Cancer Research Hospital",
    recommendation:
      "Deliver the proposed flagship cancer research hospital in Cambridge as a world-leading anchor asset.",
    lead: "NHS England / University of Cambridge",
    status: "in_progress",
    progress: 63,
  },
  {
    id: "startup-brand",
    pillar: "Startups",
    title: "Strengthen startup ecosystem and international brand",
    recommendation:
      "Support startup ecosystem institutions and a stronger international OxCAM brand to raise global VC share.",
    lead: "DSIT / DBT",
    status: "in_progress",
    progress: 41,
  },
  {
    id: "tibi-equivalent",
    pillar: "Startups",
    title: "Create UK TIBI-equivalent pools of domestic growth capital",
    recommendation:
      "Establish a UK TIBI-equivalent mechanism to increase domestic institutional capital for scale-ups.",
    lead: "HM Treasury / UK pension funds",
    status: "in_progress",
    progress: 54,
  },
  {
    id: "innovator-founder",
    pillar: "Startups",
    title: "Expand Innovator Founder visa with capacity controls",
    recommendation:
      "Operate an innovation founder visa route with clear capacity controls aligned to growth objectives.",
    lead: "Home Office / DBT",
    status: "monitoring",
    progress: 28,
  },
  {
    id: "spinout-dashboard",
    pillar: "Startups",
    title: "Maintain a transparent university spinout dashboard",
    recommendation:
      "Publish transparent spinout data to benchmark commercialisation outcomes across institutions.",
    lead: "UKRI / Universities",
    status: "implemented",
    progress: 80,
  },
  {
    id: "key-technologies",
    pillar: "R&D",
    title: "Prioritise key technologies where the UK has strength",
    recommendation:
      "Focus public support on technologies where the UK has comparative strength and corridor relevance.",
    lead: "DSIT / Sector regulators",
    status: "in_progress",
    progress: 50,
  },
  {
    id: "rd-tax-capex",
    pillar: "R&D",
    title: "Increase private R&D investment through capex incentives",
    recommendation:
      "Strengthen tax treatment of R&D capital expenditure to increase private investment depth.",
    lead: "HM Treasury / HMRC",
    status: "not_started",
    progress: 18,
  },
  {
    id: "regulatory-sandboxes",
    pillar: "R&D",
    title: "Expand regulatory sandboxes across technologies",
    recommendation:
      "Increase the quantity and breadth of regulatory sandboxes for emerging technologies.",
    lead: "FCA / Bank of England / UK regulators",
    status: "in_progress",
    progress: 60,
  },
  {
    id: "adult-education",
    pillar: "Skills",
    title: "Target adult education by place and sector",
    recommendation:
      "Implement place- and sector-targeted adult education policy to widen access to growth-sector skills.",
    lead: "DfE / Skills England",
    status: "in_progress",
    progress: 64,
  },
  {
    id: "salary-caps",
    pillar: "Skills",
    title: "Reduce skilled-worker salary caps",
    recommendation:
      "Reduce skilled-worker salary caps toward OECD top-quartile benchmarks.",
    lead: "Home Office",
    status: "at_risk",
    progress: 14,
  },
  {
    id: "tif-business-rates",
    pillar: "Skills",
    title: "Extend TIF and business-rate retention powers",
    recommendation:
      "Extend tax increment financing and local business-rate retention to support infrastructure delivery.",
    lead: "HM Treasury / MHCLG",
    status: "at_risk",
    progress: 22,
  },
];

const DEVELOPMENTS = [
  {
    id: "spinouts-register-launched",
    date: "2024-11-25",
    type: "status_change",
    title: "UKRI launches the Spinouts Register",
    summary:
      "A national register was launched to improve transparency and comparability of university commercialisation outcomes.",
    policyIds: ["spinout-dashboard", "startup-brand"],
    source: {
      label: "UKRI: Spinouts Register",
      url: "https://www.ukri.org/news/ukri-launches-spinouts-register-to-boost-university-commercialisation/",
    },
  },
  {
    id: "oxcam-launch",
    date: "2025-01-29",
    type: "announcement",
    title: "Government launches OxCAM Growth Corridor strategy",
    summary:
      "The Chancellor announced the corridor programme, including a stated potential £78bn economic boost by 2035 and linked infrastructure commitments.",
    policyIds: [
      "talent-startups",
      "housing-transport",
      "scale-cambridge",
      "crowd-in-capital",
      "cancer-hospital",
      "startup-brand",
      "key-technologies",
    ],
    source: {
      label: "GOV.UK: Chancellor kicks off OxCAM plan",
      url: "https://www.gov.uk/government/news/chancellor-kicks-off-plan-to-make-oxford-cambridge-corridor-europes-silicon-valley",
    },
  },
  {
    id: "vallance-champion",
    date: "2025-01-29",
    type: "status_change",
    title: "Lord Vallance appointed as OxCAM Innovation Champion",
    summary:
      "Government appointed an innovation champion to coordinate delivery of growth objectives across the corridor.",
    policyIds: ["talent-startups", "startup-brand", "key-technologies"],
    source: {
      label: "GOV.UK: Science Minister and Innovation Champion",
      url: "https://www.gov.uk/government/news/science-minister-to-lead-development-of-oxford-cambridge-growth-corridor",
    },
  },
  {
    id: "oxford-growth-chair",
    date: "2025-01-29",
    type: "status_change",
    title: "Chair appointed for the Oxford Growth Commission",
    summary:
      "Peter Freeman was appointed to lead the Oxford Growth Commission as a place-delivery mechanism.",
    policyIds: ["scale-cambridge", "housing-transport"],
    source: {
      label: "GOV.UK: Oxford Growth Commission appointment",
      url: "https://www.gov.uk/government/news/appointment-of-chair-for-oxford-growth-commission",
    },
  },
  {
    id: "mansion-house-accord",
    date: "2025-05-13",
    type: "announcement",
    title: "Mansion House Accord signed",
    summary:
      "Seventeen pension providers agreed to allocate at least 10% to private markets by 2030, with an ambition to unlock up to £50bn in UK assets.",
    policyIds: ["crowd-in-capital", "tibi-equivalent"],
    source: {
      label: "GOV.UK: Mansion House Accord",
      url: "https://www.gov.uk/government/news/mansion-house-accord-signed",
    },
  },
  {
    id: "immigration-white-paper",
    date: "2025-05-14",
    type: "status_change",
    title: "Immigration White Paper raises skilled-worker thresholds",
    summary:
      "Published proposals include tighter qualification and salary thresholds, moving opposite to the recommendation to reduce salary caps.",
    policyIds: ["salary-caps"],
    source: {
      label: "GOV.UK: Immigration White Paper",
      url: "https://www.gov.uk/government/publications/restoring-control-over-the-immigration-system-white-paper",
    },
  },
  {
    id: "boe-fca-ai-next-step",
    date: "2025-05-29",
    type: "announcement",
    title: "BoE and FCA announce next step for AI live testing",
    summary:
      "Financial regulators confirmed next-stage AI testing arrangements to support safe innovation in regulated settings.",
    policyIds: ["regulatory-sandboxes", "key-technologies"],
    source: {
      label: "Bank of England: AI live testing update",
      url: "https://www.bankofengland.co.uk/news/2025/may/boe-and-fca-announce-next-step-in-ai-innovation-via-ai-live-testing",
    },
  },
  {
    id: "fca-ai-service",
    date: "2025-06-09",
    type: "announcement",
    title: "FCA confirms plans for live AI testing service",
    summary:
      "The FCA confirmed a live testing service following the AI Airlock pilot, expanding practical sandbox capability.",
    policyIds: ["regulatory-sandboxes"],
    source: {
      label: "FCA: live AI testing service",
      url: "https://www.fca.org.uk/news/press-releases/fca-announces-plans-live-ai-testing-service",
    },
  },
  {
    id: "cambridge-cancer-greenlight",
    date: "2025-08-31",
    type: "status_change",
    title: "Cambridge Cancer Research Hospital receives green light",
    summary:
      "Planning approval was granted, moving the flagship cancer hospital recommendation into delivery.",
    policyIds: ["cancer-hospital"],
    source: {
      label: "University of Cambridge: hospital green light",
      url: "https://www.cam.ac.uk/stories/cambridge-cancer-research-hospital-greenlight",
    },
  },
  {
    id: "skills-levy-details",
    date: "2025-09-24",
    type: "announcement",
    title: "Government publishes Growth and Skills Levy details",
    summary:
      "DfE detailed implementation of shorter apprenticeships and wider levy flexibility from April 2026.",
    policyIds: ["adult-education"],
    source: {
      label: "GOV.UK: Growth and Skills Levy changes",
      url: "https://www.gov.uk/government/news/government-gives-firms-details-over-growth-and-skills-levy-changes",
    },
  },
  {
    id: "hmrc-rd-manual-update",
    date: "2025-10-31",
    type: "monitoring",
    title: "HMRC R&D guidance updated without dedicated OxCAM capex uplift",
    summary:
      "Updated guidance did not include a corridor-specific expansion for capital-expenditure-focused R&D relief.",
    policyIds: ["rd-tax-capex"],
    source: {
      label: "HMRC manual: CIRD81450",
      url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird81450",
    },
  },
  {
    id: "oxcam-transport-update",
    date: "2025-11-20",
    type: "announcement",
    title: "Chancellor backs East West Rail services and A428 delivery",
    summary:
      "Government confirmed support for services between Oxford, Milton Keynes and Bedford and backed a new station at Tempsford.",
    policyIds: ["housing-transport", "scale-cambridge"],
    source: {
      label: "GOV.UK: rail and road projects update",
      url: "https://www.gov.uk/government/news/chancellor-backs-rail-and-road-projects-to-boost-oxford-cambridge-growth-corridor",
    },
  },
  {
    id: "apprenticeship-offer-2026",
    date: "2026-01-29",
    type: "announcement",
    title: "New apprenticeship growth and skills package announced",
    summary:
      "Further apprenticeship reforms were announced, with April 2026 implementation points reaffirmed.",
    policyIds: ["adult-education"],
    source: {
      label: "GOV.UK: new apprenticeship offer",
      url: "https://www.gov.uk/government/news/new-apprenticeship-growth-and-skills-offer-to-fuel-opportunity-and-growth",
    },
  },
  {
    id: "skills-levy-go-live",
    date: "2026-04-01",
    type: "deadline",
    title: "Growth and Skills Levy flexibilities expected to go live",
    summary:
      "Key levy and apprenticeship flexibilities are scheduled from April 2026.",
    policyIds: ["adult-education"],
    source: {
      label: "GOV.UK: Growth and Skills Levy changes",
      url: "https://www.gov.uk/government/news/government-gives-firms-details-over-growth-and-skills-levy-changes",
    },
  },
  {
    id: "innovator-founder-monitor",
    date: "2026-02-12",
    type: "monitoring",
    title: "No dedicated OxCAM expansion of Innovator Founder capacity controls",
    summary:
      "Immigration rules continue to define route criteria, but no corridor-specific capacity-control mechanism has been announced.",
    policyIds: ["innovator-founder", "talent-startups"],
    source: {
      label: "GOV.UK: Appendix Innovator Founder",
      url: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-innovator-founder",
    },
  },
  {
    id: "tif-monitor",
    date: "2026-02-12",
    type: "monitoring",
    title: "No confirmed OxCAM-specific extension of TIF/business-rate retention",
    summary:
      "No published corridor-specific extension matching this recommendation was identified in current finance policy statements.",
    policyIds: ["tif-business-rates"],
    source: {
      label: "GOV.UK: Local Government Finance Policy Statement 2025-26",
      url: "https://www.gov.uk/government/publications/local-government-finance-policy-statement-2025-to-2026",
    },
  },
  {
    id: "a428-open-target",
    date: "2027-03-31",
    type: "deadline",
    title: "Target window for A428 Black Cat to Caxton Gibbet opening",
    summary:
      "National Highways indicates the major road scheme is planned to open in spring 2027.",
    policyIds: ["housing-transport"],
    source: {
      label: "National Highways: A428 project",
      url: "https://nationalhighways.co.uk/our-roads/east/a428-black-cat-to-caxton-gibbet/",
    },
  },
];

const state = {
  search: "",
  pillar: "all",
  status: "all",
  sort: "priority",
};

const elements = {
  tickerValue: document.getElementById("tickerValue"),
  tickerSubline: document.getElementById("tickerSubline"),
  elapsedSince: document.getElementById("elapsedSince"),
  currentRate: document.getElementById("currentRate"),
  currentYearCost: document.getElementById("currentYearCost"),
  policiesTracked: document.getElementById("policiesTracked"),
  policiesImplemented: document.getElementById("policiesImplemented"),
  policiesInProgress: document.getElementById("policiesInProgress"),
  policiesAtRisk: document.getElementById("policiesAtRisk"),
  upcomingDeadlines: document.getElementById("upcomingDeadlines"),
  searchInput: document.getElementById("searchInput"),
  pillarFilter: document.getElementById("pillarFilter"),
  statusFilter: document.getElementById("statusFilter"),
  sortSelect: document.getElementById("sortSelect"),
  visibleCount: document.getElementById("visibleCount"),
  policyList: document.getElementById("policyList"),
  timelineList: document.getElementById("timelineList"),
  timelineSummary: document.getElementById("timelineSummary"),
  sourceList: document.getElementById("sourceList"),
  datasetUpdated: document.getElementById("datasetUpdated"),
  policyTemplate: document.getElementById("policyTemplate"),
  timelineTemplate: document.getElementById("timelineTemplate"),
};

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const moneyCompact = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  notation: "compact",
  maximumFractionDigits: 1,
});

const moneyPerSecond = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeZone: "Europe/London",
});

const longDateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/London",
});

const MODEL_START_MS = Date.parse(MODEL.startAt);
const MODEL_END_MS = Date.UTC(MODEL.targetYear + 1, 0, 1);

const growthProfile = buildGrowthProfile();
const growthProfileByYear = new Map(growthProfile.map((point) => [point.year, point]));

function secondsInYear(year) {
  return (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 1000;
}

function activeYearFraction(year) {
  const yearStart = Date.UTC(year, 0, 1);
  const yearEnd = Date.UTC(year + 1, 0, 1);
  const activeStart = Math.max(yearStart, MODEL_START_MS);
  const activeEnd = Math.min(yearEnd, MODEL_END_MS);

  if (activeEnd <= activeStart) {
    return 0;
  }

  return (activeEnd - activeStart) / (yearEnd - yearStart);
}

function buildGrowthProfile() {
  const years = [];
  for (let year = new Date(MODEL_START_MS).getUTCFullYear(); year <= MODEL.targetYear; year += 1) {
    years.push(year);
  }

  const weights = years.map((_, index) => Math.pow(index + 1, MODEL.profileExponent));
  const weightedActiveTotal = years.reduce(
    (sum, year, index) => sum + weights[index] * activeYearFraction(year),
    0
  );

  return years.map((year, index) => ({
    year,
    annualValue: (MODEL.targetValue * weights[index]) / weightedActiveTotal,
  }));
}

function annualValueAt(timestamp) {
  const year = new Date(timestamp).getUTCFullYear();

  if (year < growthProfile[0].year) {
    return growthProfile[0].annualValue;
  }

  if (year > MODEL.targetYear) {
    return growthProfile[growthProfile.length - 1].annualValue;
  }

  return growthProfileByYear.get(year)?.annualValue ?? growthProfile[growthProfile.length - 1].annualValue;
}

function ratePerSecondAt(timestamp) {
  const year = new Date(timestamp).getUTCFullYear();
  const yearForRate = Math.min(Math.max(year, growthProfile[0].year), MODEL.targetYear);
  return annualValueAt(timestamp) / secondsInYear(yearForRate);
}

function cumulativeCostAt(timestamp) {
  if (timestamp <= MODEL_START_MS) {
    return 0;
  }

  let cumulative = 0;

  growthProfile.forEach((point) => {
    const yearStart = Date.UTC(point.year, 0, 1);
    const yearEnd = Date.UTC(point.year + 1, 0, 1);

    const activeStart = Math.max(yearStart, MODEL_START_MS);
    const activeEnd = Math.min(yearEnd, timestamp);

    if (activeEnd <= activeStart) {
      return;
    }

    const shareOfYear = (activeEnd - activeStart) / (yearEnd - yearStart);
    cumulative += point.annualValue * shareOfYear;
  });

  if (timestamp > MODEL_END_MS) {
    const lastPoint = growthProfile[growthProfile.length - 1];
    const continuationRate = lastPoint.annualValue / secondsInYear(lastPoint.year);
    cumulative += ((timestamp - MODEL_END_MS) / 1000) * continuationRate;
  }

  return cumulative;
}

function toTimestamp(dateString) {
  return Date.parse(`${dateString}T00:00:00Z`);
}

function formatDate(dateString) {
  return dateFormatter.format(new Date(toTimestamp(dateString)));
}

function formatElapsed(ms) {
  const totalMinutes = Math.max(0, Math.floor(ms / 60000));
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  const hours = totalHours % 24;

  if (years > 0) {
    return `${years}y ${remainingDays}d ${hours}h`;
  }

  return `${days}d ${hours}h ${totalMinutes % 60}m`;
}

function classForStatus(status) {
  return `status-${status}`;
}

function getPolicyEvents(policyId) {
  return DEVELOPMENTS.filter((event) => event.policyIds.includes(policyId)).sort(
    (a, b) => toTimestamp(b.date) - toTimestamp(a.date)
  );
}

function nextDeadlineForPolicy(policyId, nowMs) {
  const deadlines = DEVELOPMENTS.filter(
    (event) =>
      event.policyIds.includes(policyId) &&
      event.type === "deadline" &&
      toTimestamp(event.date) >= nowMs
  ).sort((a, b) => toTimestamp(a.date) - toTimestamp(b.date));

  return deadlines[0] ?? null;
}

function policyLastUpdated(policyId) {
  return getPolicyEvents(policyId)[0] ?? null;
}

function uniqueSources(items) {
  const byUrl = new Map();

  items.forEach((item) => {
    if (item?.url && !byUrl.has(item.url)) {
      byUrl.set(item.url, item.label ?? item.url);
    }
  });

  return [...byUrl.entries()].map(([url, label]) => ({ url, label }));
}

function derivePolicies() {
  const nowMs = Date.now();

  return POLICIES.map((policy) => {
    const events = getPolicyEvents(policy.id);
    const lastEvent = events[0] ?? null;
    const nextDeadline = nextDeadlineForPolicy(policy.id, nowMs);

    return {
      ...policy,
      events,
      lastEvent,
      nextDeadline,
    };
  });
}

function policyMatchesSearch(policy, query) {
  if (!query) {
    return true;
  }

  const text = [
    policy.title,
    policy.recommendation,
    policy.lead,
    policy.pillar,
    ...policy.events.map((event) => `${event.title} ${event.summary}`),
  ]
    .join(" ")
    .toLowerCase();

  return text.includes(query);
}

function sortPolicies(list) {
  const nowMs = Date.now();

  return list.sort((a, b) => {
    switch (state.sort) {
      case "recent": {
        const aDate = a.lastEvent ? toTimestamp(a.lastEvent.date) : 0;
        const bDate = b.lastEvent ? toTimestamp(b.lastEvent.date) : 0;
        return bDate - aDate;
      }
      case "deadline": {
        const fallback = Number.MAX_SAFE_INTEGER;
        const aDate = a.nextDeadline ? toTimestamp(a.nextDeadline.date) : fallback;
        const bDate = b.nextDeadline ? toTimestamp(b.nextDeadline.date) : fallback;
        return aDate - bDate;
      }
      case "alpha":
        return a.title.localeCompare(b.title);
      case "priority":
      default: {
        const aRank = STATUS_META[a.status]?.priorityRank ?? 99;
        const bRank = STATUS_META[b.status]?.priorityRank ?? 99;

        if (aRank !== bRank) {
          return aRank - bRank;
        }

        const aDeadline = a.nextDeadline ? toTimestamp(a.nextDeadline.date) : Number.MAX_SAFE_INTEGER;
        const bDeadline = b.nextDeadline ? toTimestamp(b.nextDeadline.date) : Number.MAX_SAFE_INTEGER;

        if (aDeadline !== bDeadline) {
          return aDeadline - bDeadline;
        }

        const aLast = a.lastEvent ? toTimestamp(a.lastEvent.date) : nowMs;
        const bLast = b.lastEvent ? toTimestamp(b.lastEvent.date) : nowMs;
        return bLast - aLast;
      }
    }
  });
}

function renderSnapshot(derivedPolicies) {
  const nowMs = Date.now();
  const implemented = derivedPolicies.filter((policy) => policy.status === "implemented").length;
  const inProgress = derivedPolicies.filter((policy) =>
    ["in_progress", "monitoring"].includes(policy.status)
  ).length;
  const atRisk = derivedPolicies.filter((policy) =>
    ["at_risk", "not_started"].includes(policy.status)
  ).length;

  const upcoming = DEVELOPMENTS.filter(
    (event) => event.type === "deadline" && toTimestamp(event.date) >= nowMs
  ).length;

  elements.policiesTracked.textContent = String(derivedPolicies.length);
  elements.policiesImplemented.textContent = String(implemented);
  elements.policiesInProgress.textContent = String(inProgress);
  elements.policiesAtRisk.textContent = String(atRisk);
  elements.upcomingDeadlines.textContent = String(upcoming);
}

function setText(node, text) {
  node.textContent = text;
}

function renderPolicyList(policies) {
  elements.policyList.innerHTML = "";

  policies.forEach((policy, index) => {
    const fragment = elements.policyTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".policy-card");
    const pillar = fragment.querySelector(".policy-pillar");
    const title = fragment.querySelector(".policy-title");
    const recommendation = fragment.querySelector(".policy-recommendation");
    const lead = fragment.querySelector(".policy-lead");
    const progressText = fragment.querySelector(".policy-progress");
    const statusBadge = fragment.querySelector(".status-badge");
    const progressFill = fragment.querySelector(".progress-fill");
    const lastUpdate = fragment.querySelector(".policy-last-update");
    const nextDeadline = fragment.querySelector(".policy-next-deadline");
    const eventsList = fragment.querySelector(".policy-events");
    const linksWrap = fragment.querySelector(".policy-links");

    article.classList.add(classForStatus(policy.status));
    article.style.animationDelay = `${index * 40}ms`;

    setText(pillar, policy.pillar);
    setText(title, policy.title);
    setText(recommendation, policy.recommendation);
    setText(lead, policy.lead);
    setText(progressText, `${policy.progress}% of pathway milestones`);

    statusBadge.classList.add(classForStatus(policy.status));
    setText(statusBadge, STATUS_META[policy.status]?.label ?? "Unknown");

    progressFill.style.width = `${Math.max(0, Math.min(100, policy.progress))}%`;

    setText(lastUpdate, policy.lastEvent ? formatDate(policy.lastEvent.date) : "No update logged");
    setText(nextDeadline, policy.nextDeadline ? formatDate(policy.nextDeadline.date) : "No dated deadline");

    policy.events.slice(0, 3).forEach((event) => {
      const li = document.createElement("li");
      const head = document.createElement("div");
      head.className = "event-head";

      const date = document.createElement("span");
      date.className = "event-date";
      date.textContent = formatDate(event.date);

      const type = document.createElement("span");
      type.className = "event-type";
      type.textContent = TYPE_LABEL[event.type] ?? event.type;

      const summary = document.createElement("p");
      summary.className = "policy-event-summary";
      summary.textContent = event.title;

      head.appendChild(date);
      head.appendChild(type);
      li.appendChild(head);
      li.appendChild(summary);
      eventsList.appendChild(li);
    });

    const links = uniqueSources([
      ...policy.events.slice(0, 4).map((event) => event.source),
    ]).slice(0, 3);

    links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = link.label;
      linksWrap.appendChild(a);
    });

    elements.policyList.appendChild(fragment);
  });

  elements.visibleCount.textContent = `Showing ${policies.length} policy${policies.length === 1 ? "" : "ies"}`;
}

function orderTimeline(events, nowMs) {
  const upcoming = events
    .filter((event) => event.type === "deadline" && toTimestamp(event.date) >= nowMs)
    .sort((a, b) => toTimestamp(a.date) - toTimestamp(b.date));

  const historical = events
    .filter((event) => !(event.type === "deadline" && toTimestamp(event.date) >= nowMs))
    .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));

  return [...upcoming, ...historical];
}

function renderTimeline(visiblePolicies) {
  const nowMs = Date.now();
  const relevant = DEVELOPMENTS.filter((event) => event.policyIds.some((id) => visiblePolicies.has(id)));
  const ordered = orderTimeline(relevant, nowMs);

  elements.timelineList.innerHTML = "";

  ordered.forEach((event) => {
    const fragment = elements.timelineTemplate.content.cloneNode(true);

    const marker = fragment.querySelector(".timeline-marker");
    const date = fragment.querySelector(".timeline-date");
    const title = fragment.querySelector(".timeline-title");
    const summary = fragment.querySelector(".timeline-summary");
    const tags = fragment.querySelector(".timeline-tags");
    const source = fragment.querySelector(".timeline-source");

    if (event.type === "deadline" && toTimestamp(event.date) >= nowMs) {
      marker.style.background = "#b56e1f";
    }

    setText(date, formatDate(event.date));
    setText(title, event.title);
    setText(summary, event.summary);

    const typeTag = document.createElement("span");
    typeTag.className = "timeline-tag";
    typeTag.textContent = TYPE_LABEL[event.type] ?? event.type;
    tags.appendChild(typeTag);

    const policyTagNames = event.policyIds
      .slice(0, 2)
      .map((policyId) => POLICIES.find((policy) => policy.id === policyId)?.pillar)
      .filter(Boolean);

    policyTagNames.forEach((name) => {
      const tag = document.createElement("span");
      tag.className = "timeline-tag";
      tag.textContent = name;
      tags.appendChild(tag);
    });

    source.href = event.source.url;
    source.textContent = event.source.label;

    elements.timelineList.appendChild(fragment);
  });

  const upcomingCount = ordered.filter(
    (event) => event.type === "deadline" && toTimestamp(event.date) >= nowMs
  ).length;
  elements.timelineSummary.textContent = `${ordered.length} timeline events (${upcomingCount} upcoming deadline${upcomingCount === 1 ? "" : "s"}).`;
}

function renderSources() {
  const sources = uniqueSources(DEVELOPMENTS.map((event) => event.source));
  elements.sourceList.innerHTML = "";

  sources.forEach((source) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = source.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = source.label;
    li.appendChild(a);
    elements.sourceList.appendChild(li);
  });

  const latestEvidence = DEVELOPMENTS.filter((event) => event.type !== "deadline").reduce(
    (latest, event) => Math.max(latest, toTimestamp(event.date)),
    0
  );

  elements.datasetUpdated.textContent = `Last updated: ${formatDate(
    new Date(latestEvidence).toISOString().slice(0, 10)
  )}`;
}

function renderFilters() {
  const pillars = [...new Set(POLICIES.map((policy) => policy.pillar))].sort();
  pillars.forEach((pillar) => {
    const option = document.createElement("option");
    option.value = pillar;
    option.textContent = pillar;
    elements.pillarFilter.appendChild(option);
  });

  Object.entries(STATUS_META).forEach(([value, meta]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = meta.label;
    elements.statusFilter.appendChild(option);
  });
}

function render() {
  const derived = derivePolicies();
  renderSnapshot(derived);

  const filtered = derived.filter((policy) => {
    const byPillar = state.pillar === "all" || policy.pillar === state.pillar;
    const byStatus = state.status === "all" || policy.status === state.status;
    const bySearch = policyMatchesSearch(policy, state.search);

    return byPillar && byStatus && bySearch;
  });

  const ordered = sortPolicies(filtered);
  renderPolicyList(ordered);
  renderTimeline(new Set(ordered.map((policy) => policy.id)));
}

function updateTicker() {
  const nowMs = Date.now();
  const cumulative = cumulativeCostAt(nowMs);
  const perSecond = ratePerSecondAt(nowMs);
  const annual = annualValueAt(nowMs);

  elements.tickerValue.classList.remove("is-ticking");
  elements.tickerValue.textContent = money.format(cumulative);
  void elements.tickerValue.offsetWidth;
  elements.tickerValue.classList.add("is-ticking");

  const elapsed = nowMs - MODEL_START_MS;
  elements.elapsedSince.textContent = formatElapsed(elapsed);
  elements.currentRate.textContent = `${moneyPerSecond.format(perSecond)}/sec`;
  elements.currentYearCost.textContent = `${moneyCompact.format(annual)} in ${new Date(nowMs).getUTCFullYear()}`;

  elements.tickerSubline.textContent = `Counter starts ${longDateTimeFormatter.format(
    new Date(MODEL_START_MS)
  )} and updates every second.`;
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.pillarFilter.addEventListener("change", (event) => {
    state.pillar = event.target.value;
    render();
  });

  elements.statusFilter.addEventListener("change", (event) => {
    state.status = event.target.value;
    render();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });
}

function init() {
  renderFilters();
  renderSources();
  bindEvents();
  render();
  updateTicker();
  setInterval(updateTicker, 1000);
}

init();
