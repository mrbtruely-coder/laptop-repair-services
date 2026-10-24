# Door Step Service - Website (Frontend UI)

This folder contains the complete user interface and frontend web application built with **React 19**, **Vite**, **TypeScript**, and **TailwindCSS**.

## 📁 Directory Structure
```
website/
├── public/              # Static assets (favicons, sitemap, robots.txt)
├── src/                 # Application source code
│   ├── assets/          # Brand and visual assets
│   ├── components/      # UI components (forms, layout, sections, common)
│   ├── context/         # React Context providers
│   ├── data/            # Business data (cities, services, testimonials, FAQs)
│   ├── pages/           # Page routes (Home, Services, Contact, FAQs, etc.)
│   ├── App.tsx          # Root router & layout wrapper
│   ├── index.css        # Global CSS design system (warm organic palette)
│   └── main.tsx         # React app entry point
├── index.html           # HTML5 shell
├── vite.config.ts       # Vite configuration with `/api` backend proxy
└── package.json         # Frontend dependencies
```

## 🚀 Running the Website Independently
From this `website` directory:
```bash
npm install
npm run dev
```
The website will start at `http://localhost:5173/`.

To build for production:
```bash
npm run build
```
