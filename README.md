Sowmya Vankayalapati — Portfolio

This repository contains the source for the personal portfolio site of Sowmya Vankayalapati built with Next.js. The site showcases projects, skills, and contact links and is optimized for search engines (SEO metadata and Google site verification are included).

Live demo: https://sowmya.qzz.io

## Getting Started (local)

Install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm start
```

## Environment

Create a production environment file `env.production` (not checked into git) with values such as:

```env
NEXT_PUBLIC_SITE_URL=https://sowmya.qzz.io
GOOGLE_SITE_VERIFICATION=54Z5X_l3QEDarJzQc9pgpTGdrB0n-MwsARidbyHUd9o
```

## Deployment

This project can be deployed to many hosts. For a self-managed deployment using an Ubuntu EC2 instance, Nginx and Cloudflare Origin Certificates, see the full step-by-step guide in [DEPLOYMENT.md](DEPLOYMENT.md).

## SEO and verification

- Google site verification meta tags have been added to the app layout. Verify ownership in Google Search Console after deploying the site.
- `public/robots.txt` and `public/sitemap.xml` are included to help crawlers discover your site.

## Contributing

Make changes locally, commit, and open a PR. To push directly, ensure you have access to this repo and follow the authentication steps (SSH or HTTPS) described in the project notes.

## License

See repository for license and additional notes.

