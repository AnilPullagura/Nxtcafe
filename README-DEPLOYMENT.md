# Deployment Notes

## Local Build Issues

If you're experiencing build errors locally, it's likely due to Node.js version compatibility. This project is configured for **Node.js 18**, which is what Vercel uses by default.

### To build locally:

1. **Switch to Node.js 18** (if using nvm):
   ```bash
   nvm use 18
   ```

2. **Or install Node.js 18** from [nodejs.org](https://nodejs.org/)

3. **Clean and reinstall dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

## Vercel Deployment

The project is configured to deploy on Vercel with:
- **Node.js 18.x** (specified in `vercel.json`)
- **Legacy peer deps** flag to handle dependency conflicts
- **SPA routing** configured for React Router

### Deploy Steps:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

The build should work on Vercel even if it fails locally with Node.js 24+.
