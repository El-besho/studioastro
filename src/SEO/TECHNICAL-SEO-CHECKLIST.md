# Technical SEO & Performance Checklist

This document outlines the technical research, measurement, and delivery requirements for implementing our SEO and performance strategy, as defined in `SYSTEM-BLUEPRINT.md`.

## 1) Benchmarks & Budgets

- [ ] **Performance Budgets (per route/type):**
    - [ ] JS Payload ≤ **150 KB** (gz/br)
    - [ ] Critical Inline CSS ≤ **14 KB**
    - [ ] Images: Target **≥70%** optimization ratio (modern formats, compression).
- [ ] **Core Web Vitals (CWV) Targets:**
    - [ ] LCP ≤ **1.8 s**
    - [ ] INP ≤ **100 ms**
    - [ ] CLS ≤ **0.05**
    - [ ] FCP ≤ **1.2 s**
    - [ ] TTFB ≤ **300 ms** (CDN Edge)
- [ ] **Device/Network Matrix for Testing:**
    - [ ] Low-end Android (e.g., Moto G4)
    - [ ] Mid-tier Android (e.g., Pixel 6)
    - [ ] iPhone baseline (e.g., iPhone 12)
    - [ ] 3G / 4G network profiles.

## 2) Measurement & Instrumentation

- [ ] **Tooling Plan:**
    - [ ] **Lab:** Lighthouse CI, WebPageTest profiles, Chrome DevTools Tracing.
    - [ ] **Field (RUM):** `web-vitals` library (including INP), TTFB per geo/ISP, long-task logging.
- [ ] **Dashboards & Alerts:**
    - [ ] Daily field CWV trend dashboard.
    - [ ] Route-level LCP element attribution.
    - [ ] Performance alerts for budget regressions.
- [ ] **Attribution Logging:**
    - [ ] Largest Contentful Paint (LCP) element logging.
    - [ ] Resource timing for fonts, images, critical CSS.
    - [ ] Core Web Vitals element CLS shifts.

## 3) SEO Research & Implementation (per `KEYWORD-STRATEGY.md`)

- [ ] **SERP Term Corpus (per primary keyword & locale):**
    - [ ] Extract terms, entities, and common sections from Top-10 content.
    - [ ] Map to target placements (Title, H1, intro, H2s, alts, anchors).
- [ ] **Template Placement Matrix:**
    - [ ] Define required locations for primary keywords and variants for each page type.
    - [ ] Establish min/max keyword counts per template.
- [ ] **Schema Inventory & Implementation:**
    - [ ] Implement required schema types (`Service`, `LocalBusiness`, `FAQPage`, `BreadcrumbList`, etc.).
    - [ ] Ensure all schema is validated and error-free.
- [ ] **Internal Linking Map:**
    - [ ] Implement hub/spoke architecture (Pillar Page -> Sub-service/City pages).
    - [ ] Use defined anchor text variants.
- [ ] **Arabic/Multilingual SEO Strategy:**
    - [ ] Implement `hreflang` for `ar-SA`.
    - [ ] Establish canonicalization rules for all pages.
    - [ ] Optimize snippet lengths for Arabic search results.

## 4) Arabic & RTL Excellence

- [ ] **Font Stack Optimization:**
    - [ ] Subset primary Arabic web fonts.
    - [ ] Use WOFF2 with Brotli compression.
    - [ ] Set `font-display: swap` and test fallback rendering.
- [ ] **Typography & Readability:**
    - [ ] Optimize `line-height` and `word-spacing`.
    - [ ] Test text justification and avoid `kashida`-induced CLS.
- [ ] **RTL Layout QA:**
    - [ ] Thoroughly test navigation, forms, tables, and all interactive elements.
- [ ] **Accessibility (a11y) in Arabic:**
    - [ ] Test screen reader order in RTL layouts.
    - [ ] Use ARIA attributes correctly for mixed LTR/RTL content.
    - [ ] Ensure logical focus order.

## 5) Loading & Caching Architecture

- [ ] **Server & CDN Plan:**
    - [ ] Configure edge caching rules (Stale-While-Revalidate).
    - [ ] Ensure regional PoP routing for MENA.
- [ ] **Bundle Strategy:**
    - [ ] Implement route-level code-splitting.
    - [ ] Govern third-party scripts (async/defer, `fetchpriority`).
- [ ] **Service Worker:**
    - [ ] Implement static and runtime caching strategies.
    - [ ] Define offline fallbacks.

## 6) Acceptance Criteria

- [ ] **Lighthouse:** Perf ≥ 95; A11y ≥ 98; SEO = 100; PWA ≥ 90.
- [ ] **Core Web Vitals (p75 field data):** LCP ≤1.8 s, INP ≤100 ms, CLS ≤0.05.
- [ ] **Arabic:** Font load ≤800 ms; RTL rendering score ≥98%.
- [ ] **Mobile:** Touch compliance 100%; Mobile usability 100%.
- [ ] **Loading:** Main thread bundle ≤150 KB (gz/br); Cache hit rate ≥95%.
