# Journal restore and image update

- The Journal contained 28 posts, but 12 had future publication dates. Hugo had `buildFuture = false`, so only 16 appeared on the live Journal page.
- Those 12 posts now use publication dates on or before July 11, 2026, so all 28 display immediately.
- Every Journal post now has its own unique Unsplash cover image. No Journal cover URL is repeated.
- Every cover has descriptive alt text and a visible photographer/source credit on the article page.
- Blog list, article, related-post, Open Graph, Twitter, and BlogPosting schema templates now handle external image URLs correctly.
- CMS fields were added for image credit and image-credit URL.
