# OxCAM Growth Scenario Tracker

Static web tracker with two core components:

1. A live **Cost of Inaction** ticker that starts at midnight on 29 January 2025 and updates every second.
2. An **Implementation Tracker** for Public First Growth Scenario recommendations, including status, developments, and upcoming deadlines.

## Files

- `index.html` - page structure and templates
- `styles.css` - visual design and responsive layout
- `app.js` - ticker model, policy data, filters, and rendering logic

## Local preview

Run a local server from this folder so the browser can load assets correctly:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Updating tracker data

All tracker data is currently embedded in `app.js`:

- `POLICIES` holds the recommendation list and current status.
- `DEVELOPMENTS` holds announcements, status changes, and deadlines.
- `MODEL` holds assumptions for the ticker trajectory.

Update those arrays/values to refresh the site.
