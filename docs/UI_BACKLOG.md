# UI/UX backlog

Found in a UI/UX review (Lighthouse: accessibility 95, best practices 96, SEO 100,
plus a manual keyboard and screen-reader pass). All items below are done; Lighthouse
(desktop) now passes all 60 audits: accessibility, best practices, SEO and agentic
browsing all 100.

## Broken or confusing

- [x] **Spot cards couldn't be opened with the keyboard.** The spot name is now a button
      inside an `h2`.
- [x] **Login asked for "Username" but the backend wants an email.** Now an `Email` field
      (`type="email"`, autocomplete), heading "Log in".
- [x] **Reviews didn't show who wrote them or when.** Each review shows the author's name
      and date.
- [x] **Review form heading was the user's email.** Now "Review of {spot}" /
      "Edit your review of {spot}", with "Posting as {email}" underneath.
- [x] **Dead controls.** "Navigate" is now "Directions" and opens Google Maps walking
      directions to the building; "Favorites" in the user menu opens the profile scrolled
      to favorite locations.
- [x] **`alert()` pop-ups.** Form errors are inline (`role="alert"`); confirmations
      ("Logged in", "Review posted", "Logged out", …) are toasts under the header. Signup's
      error message is now shown.

## Accessibility

- [x] Sort and Tags dropdowns have labels.
- [x] Every page has one `h1`; headings no longer skip levels.
- [x] Search box has a (visually hidden) label.
- [x] Tab order: the main content comes before the map, so Tab reaches search and the spot
      list before the 11 Google Maps controls.
- [x] Map pins' accessible names contain their visible text
      (e.g. "Memorial Union, rated ★ 4.0, 2 spots").
- [x] Review stars are real radio buttons ("3 stars"), usable from the keyboard.

## Found and fixed along the way

- Signing up with an email that already exists created a duplicate account (backend
  returned 200). Signup now returns 409, which the form explains.
- After signing up you looked logged in but had no token, so posting a review failed.
  Signup now logs in for real.
- Refreshing the page logged you out visually even though the token was still valid.
  The session is now restored on load until the token expires.
- Primary buttons were still Bootstrap blue (CSS order); they are now the logo's navy.

## Open

- The profile page's favorites panel is blank when you have none; it could say so and
  point to the ☆ on each spot.
