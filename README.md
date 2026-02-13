neoCommerce - Developed a full-stack product purchase and management platform enabling users to discover, filter, and purchase products with an intuitive user experience.
Live - https://neocommerce-web.onrender.com/

Features:
* Implemented role-based authentication and authorization using JWT (JSON Web Token), and designed
 RESTful APIs for product management, user authentication and order processing
* Integrated cart, wishlist and features like dynamic product listings, search, filters, and sorting to enhance product discovery and user engagement with CRUD functionality

## Deploying on Vercel

This repo is now configured to deploy as:
- **Frontend**: static CRA build from `client/build`
- **Backend API**: Vercel serverless function via `api/[...all].mjs`

### Required Vercel environment variables
Set these in your Vercel project settings:
- `MONGO_URL`
- `JWT_SECRET`
- Any other backend env vars you use in controllers/helpers
- (Optional) `REACT_APP_API` — leave empty to use same-origin API routes on Vercel

### Build settings
The included `vercel.json` already configures:
- `installCommand: npm install --prefix Backend && npm install --prefix client`
- `buildCommand: npm run build --prefix client`
- `outputDirectory: client/build`
- SPA rewrite to `index.html` for non-API routes (`/api` and `/api/*` are excluded)
- Serverless function config for `api/[...all].mjs` uses Node.js 20 runtime and includes backend files

### Local check
- Frontend build: `cd client && npm run build`
- API runtime entry: `api/[...all].mjs` imports `Backend/app.js`
