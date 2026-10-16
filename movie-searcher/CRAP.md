# CRAP Design Pass — Movie Searcher

This document records the UI changes made to the app and links each one to a CRAP
principle.

**CRAP** is a set of four visual-design principles introduced by Robin Williams in
*The Non-Designer's Design Book*:

| Principle     | Idea                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **C**ontrast  | If two things are not the same, make them *very* different. Important things should clearly dominate. |
| **R**epetition| Repeat visual elements (color, shape, spacing, type, treatment) to create unity and consistency.       |
| **A**lignment | Nothing sits arbitrarily — every element lines up with something else on a shared axis.                |
| **P**roximity | Related items are grouped close together; unrelated items are pushed apart.                            |

The original screen was functional but flat: no page identity, everything at the
same visual weight, a nested/duplicated container, and a stray line of text inside
the detail dialog. The pass below fixes those in terms of CRAP.

---

## What changed, and why

### 1. Contrast

| Change                                                                                      | Why                                                                                                                                          | Principle |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Added a page **header** with an icon, a `text-4xl` title and a muted subtitle               | The screen had no focal point. A large, bold title immediately gives the page a clear entry point and hierarchy.                              | Contrast  |
| Split the title color: "Movie" in `slate-900`, "Searcher" in the theme **primary** color     | Creates emphasis within the headline and ties the brand color to the primary action color used throughout the app.                            | Contrast  |
| Changed card/dialog CTAs from grey **outlined** `border` buttons to solid **filled** `primary` buttons ("View details", "Search", "Close") | All buttons previously looked identical and low-emphasis. Important actions are now visually dominant while secondary actions stay quiet.    | Contrast  |
| Made card titles bold/dark (`text-base font-semibold text-slate-900`) and metadata small/muted/uppercase | Title and metadata were nearly the same weight. Now the hierarchy (title → metadata → action) is obvious at a glance.                          | Contrast  |
| Used **tonal** alerts and `primary`/neutral **chips** for metadata                         | Gives status and metadata a distinct, readable treatment instead of plain body text.                                                            | Contrast  |
| Set the page background to `bg-slate-100` (was pure white)                                    | White cards/surfaces now read as raised objects against the muted background, adding depth and separation.                                     | Contrast  |

### 2. Repetition

| Change                                                                                             | Why                                                                                                                                    | Principle  |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Every movie card uses the exact same anatomy: poster → title → metadata → full-width primary CTA    | Repeating the structure makes the grid scannable and predictable; users learn one card and understand them all.                        | Repetition |
| Repeated the same `rounded-xl` corner radius, `border` + soft `shadow` surface and spacing scale across cards, search panel and dialog | A shared "surface language" unifies otherwise separate components.                                                                     | Repetition |
| Reused the same **chip** treatment for metadata in the detail dialog                                | Metadata is presented consistently everywhere instead of being ad-hoc text.                                                            | Repetition |
| Centralized the poster fallback (`src/utils/poster.ts` + `src/assets/poster-placeholder.svg`)       | Cards and the dialog render the *identical* placeholder image, so no view shows a broken/blank poster.                                 | Repetition |
| Consistent loading treatment (same `v-progress-circular` size/width/color)                          | The list and the dialog now signal "loading" the same way.                                                                             | Repetition |

### 3. Alignment

| Change                                                                                          | Why                                                                                                                                        | Principle |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| Removed the **nested `v-container`** in `MovieList.vue` (it was wrapped in the page's container) | Double containers meant double padding and content that didn't line up with the header/search above it. Everything shares one content grid now. | Alignment |
| Constrained the page to a single centered column (`mx-auto max-w-6xl`)                           | Creates one shared vertical axis that the header, search panel, results heading and grid all respect.                                       | Alignment |
| Anchor card text to a single left edge and pin each CTA to the card's bottom edge                | Titles, metadata and buttons now line up across cards regardless of how many lines the title wraps to.                                     | Alignment |
| Added a "Results (n)" heading aligned with the grid                                              | Connects the result count to the cards beneath it instead of floating unexplained.                                                          | Alignment |
| Centered the page header and the loading/empty states                                          | Text blocks that belong to the whole page are centered on the same axis as the content column.                                             | Alignment |

### 4. Proximity

| Change                                                                                              | Why                                                                                                                                          | Principle |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Grouped the search field and its "Search" button inside one elevated white **panel** (`v-sheet`)     | Search inputs and their action belong together; the panel visually binds them and separates them from the results below.                     | Proximity |
| Wrapped the header title + subtitle + icon tightly, with larger space before the search panel        | Title and description are one unit; the gap between that unit and the next section expresses "different group".                             | Proximity |
| Tightened internal card spacing (poster→title→meta) and used generous gutters *between* cards        | Items inside a card are related and sit close; cards themselves are distinct units and get breathing room.                                   | Proximity |
| Grouped the dialog's title and metadata chips, then gave the plot text its own space above the divider | Title/meta form a block; synopsis is a separate block; the divider and full-width action close the dialog cleanly.                          | Proximity |

---

## Incidental fixes included

These are not strictly CRAP, but they were required to make the design review
meaningful:

- **Restored `vite.config.mts`.** The project had no Vite config at all, so the Vue
  plugin never registered and the app could not build or run (`[PARSE_ERROR]` on
  every `.vue` file). The config wires up `@vitejs/plugin-vue`, `vite-plugin-vuetify`,
  `@tailwindcss/vite`, `unplugin-fonts` and the `@` → `src` alias.
- **Removed a stray line of text in `MoviePage.vue`.** The original template
  rendered `trar la informació detallada dins d'un v-dialog.` inside the dialog
  body — leftover placeholder text that broke the dialog's alignment and readability
  (noise also works against contrast).
- **Updated the document title** in `index.html` from *"Welcome to Vuetify 4"* to
  *"Movie Searcher"*.
- **Dialog now closes on Esc / backdrop click.** `@update:model-value` emits
  `movieClose` so the parent's `movieOpen` state stays in sync with the UI.

---

## Files touched

- `src/App.vue` — muted page background
- `src/pages/index.vue` — page header, content column
- `src/components/Searchbar.vue` — grouped search panel + primary button
- `src/components/MovieList.vue` — results heading, equal-height cards, states
- `src/components/MoviePage.vue` — dialog layout, chips, actions, cleanup
- `src/utils/poster.ts`, `src/assets/poster-placeholder.svg` — shared poster fallback
- `vite.config.mts` — restored build configuration
- `index.html` — document title

---

## Before → After at a glance

| Area          | Before                                                        | After                                                                   |
| ------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Page identity | None — search bar dropped at the top of a blank page          | Centered title + icon + description, primary accent on the headline     |
| Search        | Bare text field                                               | Text field + Search button grouped in an elevated surface               |
| Results       | Cards with equal-weight title/subtitle, grey "More" outline button | Scannable grid, bold titles, muted metadata, primary "View details" CTA |
| Empty/loading | Generic alerts and a lone spinner                             | Consistent states with labels and repeated spinner styling              |
| Detail dialog | Stray text, plain layout, grey "Go back"                      | Poster + chip metadata + divider + full-width primary "Close"           |
