# Honor Roll Calculator

A single-page web app that determines a student's Honor Roll eligibility based on academic, effort, and conduct grades.

## Usage

Open `index.html` in any modern browser — no build step or server required.

1. Enter grades for each course (course name is optional)
2. Click **Calculate Honor Roll**
3. View your result and a full criteria breakdown

## Grade Input Format

| Field | Values |
|-------|--------|
| Academic | GPA scale: `2.0 – 4.0`, or percentage: `50 – 100` (auto-converted) |
| Effort | `1` = Excellent, `2` = Good, `3` = Satisfactory |
| Conduct | `4` = A, `3` = B, `2` = C |

Percentage conversion: values above 4 are divided by 25 (e.g. 92 → 3.68, 100 → 4.0).

## Honor Roll Levels

### Principal Honor Roll
- All academic grades ≥ 3.5
- All effort grades = 1 (Excellent)
- All conduct grades = 4 (A)

### Superior Honor Roll
- Academic average ≥ 3.7
- No academic grade < 3.5
- All effort grades ≤ 2
- Conduct average ≥ 3.7

### Honor Roll
- Academic average ≥ 3.5
- At most 1 academic grade < 3.0
- All effort grades ≤ 2
- Conduct average ≥ 3.0

## Features

- Add or remove courses dynamically
- Live validation on academic grade input
- Detailed pass/fail breakdown for each criterion
- Fully responsive (mobile-friendly)
- No dependencies — pure HTML, CSS, and JavaScript
