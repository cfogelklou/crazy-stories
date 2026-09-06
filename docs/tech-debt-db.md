# Technical Debt Database

This file tracks technical debt and known gaps encountered during development.
Add entries whenever you find issues that won't be fixed immediately. Entries
are numbered TD-N with Added / Location / Issue / Impact / Proposed Fix /
Severity; newest first.

## Active Items

### TD-001: SEO — hub link-back + head/favicon/sitemap gaps (verified 2026-09-06)

**Added**: 2026-09-06 (seo branch)

**Location**: `index.html` (`<head>`), favicon asset, root monorepo `sitemap.xml`, app footer/about surface

**Issue**: No og:/twitter: meta tags; the favicon is still the default Vite
`vite.svg`; the app is NOT yet in the root monorepo `sitemap.xml` (the root
side will fix this — noted here for awareness only). Deployed at
`/locolibs/`; the hub landing page is /apps/loco-libs/. The app also has no
link back to the Applicaudia studio hub.

**Impact**: Bare link previews (no title/description/image on shares); weak
search discovery until sitemap inclusion lands; the app is invisible in the
studio's cross-network graph.

**Proposed Fix**:
1. Link back to the Applicaudia hub: add a small footer or about mention
   linking https://applicaudia.se/apps/loco-libs/ (landing page for this app)
   and https://applicaudia.se/home/ (studio directory). The landing pages
   exist and are deployed from the root monorepo.
2. Add og:/twitter: meta (title, description, og:image, og:url,
   twitter:card) to `index.html`.
3. Replace the default `vite.svg` favicon with a real one.
4. (Awareness) Root monorepo will add the app to `sitemap.xml` — no action
   needed in this repo.

**Severity**: Low-Medium
