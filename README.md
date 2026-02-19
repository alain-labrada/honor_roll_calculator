# Honor Roll Calculator

A single-page web app that determines a student's Honor Roll eligibility based on academic, effort, and conduct grades.

## Usage

Open `index.html` in any modern browser — no build step or server required.

1. Enter grades for each course manually, or use **Bulk Import** to paste a comma-separated list
2. Click **Calculate Honor Roll**
3. View your result and a full criteria breakdown
4. Click **Print Report** to open a print-ready summary

## Grade Input Format

| Field | Values |
|-------|--------|
| Academic | GPA scale: `2.0 – 4.0`, or percentage: `50 – 100` (auto-converted) |
| Effort | `1` = Excellent, `2` = Good, `3` = Satisfactory |
| Conduct | `4` = A, `3` = B, `2` = C |

Percentage conversion: values above 4 are divided by 25 (e.g. 92 → 3.68, 100 → 4.0).

## Bulk Import

Paste academic grades as a comma-separated list (e.g. `3.7, 3.5, 4.0, 3.2`) and click **Import**. Each course is created with Effort set to `1` (Excellent) and Conduct set to `4` (A) by default — review and adjust after importing.

Grades can also be extracted automatically from the Miami-Dade Gradebook portal using the built-in browser script (expand the **How to get your grades from Gradebook** section for instructions).

## Honor Roll Levels

### Principal Honor Roll
- All academic grades ≥ 3.5
- All effort grades = 1 (Excellent)
- All conduct grades = 4 (A)

### Superior Honor Roll
- Academic average ≥ 3.7
- No academic grade < 3.0
- All effort grades ≤ 2
- Conduct average ≥ 3.7
- No conduct grade ≤ 2

### Honor Roll
- Academic average ≥ 3.5
- At most 1 academic grade < 3.0
- All effort grades ≤ 2
- Conduct average ≥ 3.0
- No conduct grade ≤ 2

## Features

- Add or remove courses dynamically
- Bulk import academic grades from a comma-separated list
- Gradebook script to extract grades from Miami-Dade portal
- Live validation on academic grade input
- Detailed pass/fail breakdown for each criterion
- Print Report — opens a formatted, print-ready eligibility report
- Fully responsive (mobile-friendly)
- No dependencies — pure HTML, CSS, and JavaScript
