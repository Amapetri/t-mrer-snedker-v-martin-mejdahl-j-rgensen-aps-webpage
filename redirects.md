# Redirect Mapping

Old site: https://www.mejdahltoemrer.dk/
New site: (Vercel deployment domain)
Mapped: 2026-04-27

The old site had only 3 content pages. All redirect decisions are straightforward — see judgment log entries in `.redesign-state/decisions.md`.

## Redirect Table

| Old URL | New URL | Type | Rationale |
|---------|---------|------|-----------|
| `https://www.mejdahltoemrer.dk/` | `/da/` | 301 | Homepage → Homepage |
| `https://www.mejdahltoemrer.dk/referencer/` | `/da/projekter/` | 301 | Cases listing → new /projekter/ hub (renamed for clarity and SEO) |
| `https://www.mejdahltoemrer.dk/kontakt/` | `/da/kontakt/` | 301 | Contact → Contact (trailing slash normalized) |
| `https://www.mejdahltoemrer.dk/sitemap.xml` | — | Skip | Asset, no redirect needed |
| `https://www.mejdahltoemrer.dk/page-sitemap.xml` | — | Skip | Asset, no redirect needed |

## No-redirect URLs

These do not need redirects — they are WordPress system paths that will not exist on the new Next.js site, and Google knows they are CMS internals:
- `/wp-admin/`
- `/wp-login.php`
- `/wp-content/`
- `/wp-includes/`
- All `/?p=`, `/?page_id=` query strings (no inbound links found)

## Next.config.ts implementation

The redirect function in `next.config.ts` handles the path-level redirects. The `da` locale prefix is managed by `next-intl` — old paths without locale prefix redirect to `/da/` equivalent.

```typescript
async redirects() {
  return [
    {
      source: '/referencer',
      destination: '/da/projekter',
      permanent: true,
    },
    {
      source: '/referencer/',
      destination: '/da/projekter',
      permanent: true,
    },
    {
      source: '/kontakt',
      destination: '/da/kontakt',
      permanent: true,
    },
    {
      source: '/kontakt/',
      destination: '/da/kontakt',
      permanent: true,
    },
  ];
},
```

## SEO Notes

- All 3 old URLs had minimal accumulated ranking (last updated 2015–2022, low authority site)
- The `/referencer/` page is the most likely to have any inbound links — the new `/projekter/` destination is the correct mapping
- No Google Search Console access — redirects are based on URL inventory crawl only
- Priority: implement before launch to preserve any accumulated equity
