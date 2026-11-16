# UI/UX backlog

Found in a UI/UX review (Lighthouse: accessibility 95, best practices 96, SEO 100,
plus a manual keyboard and screen-reader pass). Tick items off as they land.

## Broken or confusing

- [x] **Spot cards can't be opened with the keyboard.** *(Fixed in the list redesign: the spot name is now a button inside an `h3`.)* Each card is a `div` with an
      `onClick`; Tab goes search → Sort → Tags and skips every spot. Make the spot name a
      real button/link. (`BadgerSearchResult.jsx`)
- [ ] **Login asks for "Username" but the backend wants an email.** Rename the label and
      placeholder. (`BadgerLogin.jsx`)
- [ ] **Reviews don't show who wrote them or when.** The API already returns
      `user.name` and `createdAt`; `BadgerReview.jsx` has a TODO for it.
- [ ] **Review form heading is the user's email**; it should name the spot being
      reviewed. (`BadgerAddReviewPage.jsx`)
- [ ] **Dead controls:** "Navigate" on the spot page does nothing (could open Google Maps
      walking directions to the building); "Favorites" in the user menu does nothing
      (could link to the profile page).
- [ ] **`alert()` pop-ups** for login, signup and review results. Replace with inline
      messages. Signup also sets an error message it never renders.

## Accessibility

- [x] Sort and Tags dropdowns (react-select) have no label. *(Fixed: `aria-label`s added.)*
- [ ] No `h1`. *(Spot names are now `h3` headings, so screen-reader users can jump between
      spots; the page still lacks a top-level heading.)*
- [x] Search box is labelled only by its placeholder. *(Fixed: visually hidden label.)*
- [ ] The 11 Google Maps controls come before the search panel in Tab order.
- [ ] Map pins' accessible names ("Memorial Union: rated 4.0, 2 study spots") don't
      contain their visible text ("★ 4.0 2"); Lighthouse flags this as
      `label-content-name-mismatch`. Start the title with the visible rating.

After the design pass, Lighthouse (desktop) scores accessibility 100, best practices 100,
SEO 100.
