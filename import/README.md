# Shopify import — books.slatterymedia.com

Scraped from the live site on 27 Oct 2026: 48 books (45 in "Our Titles", 3 on sale).

## Order of operations

1. **Create metafield definitions first** (Settings → Custom data → Products), all *Single line text*,
   namespace `book`: `isbn`, `author`, `format`, `published`, `pages`, `size`, `weight`.
   The CSV import skips metafield columns that have no definition.
2. **Import `shopify-products.csv`** (Products → Import). Cover images are pulled from the
   old site's URLs, so import while books.slatterymedia.com is still online.
3. **Create two automated collections:**
   - `Our Titles` (handle `our-titles`): Type = Book AND Tag ≠ Sale, sort "Date, new to old"
   - `Sale` (handle `sale`): Tag = Sale
4. **Import `shopify-redirects.csv`** (Content → Menus → URL Redirects → Import) once the domain points
   at Shopify, so old `/store/viewItem/...` links keep working.
5. **Rehost the files in `media-files-to-rehost.csv`**: PDFs/audio linked in product descriptions
   still point to books.slatterymedia.com. Upload them to Content → Files and swap the URLs
   before the old site goes offline.

## Theme setup (Online Store → Customize)

- Header logo: upload `brand-assets/smg-logo-white.png`; favicon: `brand-assets/favicon.ico`
- Banner (in header): upload `brand-assets/banner-crossing-the-line.jpg` to the first slide;
  add more slides to rotate like the old site
- Main menu: Home `/`, New Books `/#bestsellers`, Best Sellers `/#bestsellers`, Sale `/#sale`, Contact
- Footer menu (handle `footer`): Privacy Policy, Terms of Use
