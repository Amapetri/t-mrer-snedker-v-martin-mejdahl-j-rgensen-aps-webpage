# URL Inventory

Complete list of URLs discovered during the Step 1 old-site crawl. Consumed by the `redirect-mapping` skill in Step 4 so it doesn't have to re-crawl.

## Schema

```
### Old site: https://oldsite.example/

**Crawled:** YYYY-MM-DDThh:mm
**Source:** homepage nav + sitemap.xml + internal link discovery

## URLs

| URL | Category | Notes |
|-----|----------|-------|
| https://oldsite.example/ | Homepage | Primary entry point |
| https://oldsite.example/about | About | |
| https://oldsite.example/services/welding | Service detail | Flagship service |
| ... | ... | ... |
```

**Category values:** `Homepage`, `About`, `Services hub`, `Service detail`, `Cases listing`, `Case detail`, `Contact`, `Legal`, `Blog`, `Job`, `Asset`, `Dynamic/query`, `Admin/system` (no redirect), `Dead/broken` (no redirect).

---

### Old site: https://www.mejdahltoemrer.dk/

**Crawled:** 2026-04-27T00:00+02:00
**Source:** Homepage nav links + sitemap.xml (via sitemap index at `/sitemap.xml` → `/page-sitemap.xml`) + inline link discovery
**CMS:** WordPress (Yoast SEO sitemap, TopShop by Kaira theme)

## URLs

| URL | Category | Last Modified | Notes |
|-----|----------|--------------|-------|
| https://www.mejdahltoemrer.dk/ | Homepage | 2022-02-02 | Primary entry point. Contains service list, contact details inline, Byg Garanti badge, hero image. |
| https://www.mejdahltoemrer.dk/referencer/ | Cases listing | 2015-04-08 | Portfolio/references page. 3 case studies with photos. No individual case detail URLs — all cases are on a single page. Last updated 2015. |
| https://www.mejdahltoemrer.dk/kontakt/ | Contact | 2020-06-02 | Contact page. Address, phone, email, CVR. No form, no map, no hours. |
| https://www.mejdahltoemrer.dk/sitemap.xml | Asset | — | Sitemap index (Yoast SEO). References page-sitemap.xml. No redirect needed. |
| https://www.mejdahltoemrer.dk/page-sitemap.xml | Asset | — | Page sitemap. Lists 3 content URLs. No redirect needed. |
| http://www.danskbyggeri.dk | External | — | Dansk Byggeri membership link in footer. External — no redirect. |
| http://www.kairaweb.com/ | External | — | WordPress theme credit in footer. External — no redirect. |
| http://wordpress.org/ | External | — | WordPress credit in footer. External — no redirect. |

## Redirect Mapping Notes

The old site has only 3 content pages. Suggested redirect mapping for the new site:

| Old URL | New URL (suggested) | Rationale |
|---------|-------------------|-----------|
| `/` | `/` | Homepage maps to homepage |
| `/referencer/` | `/cases` or `/projekter` | Cases/portfolio section |
| `/kontakt/` | `/kontakt` | Contact page (drop trailing slash) |

**Observations:**
- The site has an extremely small URL count — just 3 content pages total. This is a brand new architecture opportunity: the new site should significantly expand on this with dedicated service pages, an About page, and individual case detail pages.
- No blog, jobs, legal pages, or language variants exist on the old site.
- WordPress admin URLs (e.g., `/wp-admin/`, `/wp-content/`) will be gone in the new Next.js build — no redirects needed.
- All existing URLs use trailing slashes; the new Next.js site should handle both `/kontakt` and `/kontakt/` gracefully.
