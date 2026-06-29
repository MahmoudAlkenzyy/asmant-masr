# Asmant Masr (Cement Egypt) Technical Stack & Developer Guide

Welcome to the technical setup and architecture documentation for **Asmant Masr (Cement Egypt)**, a modern, highly performant, and responsive multi-language web application.

---

## 🛠️ Technology Stack Breakdown

This application is built on top of a highly optimized, enterprise-grade frontend architecture utilizing the following key technologies:

### 1. Core Framework & Runtime
*   **Next.js (v15.5.4 / v16.0.10 Preview)**: A React framework for building high-performance web applications. The project uses the Next.js **App Router** for layout-based routing, server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR).
*   **React (v19.2.3)**: Leveraging modern React 19 capabilities including concurrent rendering, transitions, server-client component boundaries, and optimized hook execution.
*   **TypeScript (v5.x)**: A strictly-typed superset of JavaScript to ensure maximum type safety, intelligent autocompletion, and robust error checking across modules.

### 2. UI, Component Libraries & Design System
*   **Tailwind CSS (v4)**: Modern, highly customizable utility-first CSS framework. Used in conjunction with `@tailwindcss/postcss` for lightning-fast build-time utility compilation.
*   **HeroUI (v2.8.5)**: A state-of-the-art UI system (formerly NextUI) providing accessible, dynamic, and styled components out-of-the-box, integrated via Tailwind plugins.
*   **Radix UI Themes**: Robust, low-level accessibility primitives ensuring standard keyboard and screen-reader support for complex widgets.
*   **Lucide React**: Clean, modern, scalable vector (SVG) icons that adjust perfectly to dark themes and custom color layouts.
*   **Swiper (v12.0.2)**: A modern mobile-touch slider framework for building fluid, responsive carousels and swipe layouts across pages (such as news banners, product galleries, etc.).

### 3. State Management & Form Handling
*   **Formik (v2.4.6)**: Declarative form state management that keeps state, validation errors, and submission handlers modularized.
*   **Yup (v1.7.1)**: Schema-based object validation library paired with Formik to validate form inputs (such as login fields and subscription inputs) before submission.

### 4. Localization & Internationalization (i18n)
*   **Custom Language Context (`LanguageContext`)**:
    *   Dynamic runtime language toggle (Arabic `ar` & English `en`).
    *   Automatic page-direction adjustment (RTL for Arabic, LTR for English).
    *   Centralized translation maps (`translationsAr` and `translationsEn`) providing clean translation keys throughout the app.
*   **Fetch Localization Wrapper (`fetchWithLanguage`)**:
    *   A custom fetch utility that intercept requests and automatically appends the correct `Accept-Language` headers, guaranteeing localized API responses.
*   **Cookies Integration (`js-cookie`)**:
    *   Persists language preference across sessions and ensures consistent localization during server-side renders.

### 5. Notifications & Utilities
*   **React Toastify (v11.0.5)**: Standardized toast notification library for premium, non-blocking UI alert messages.

---

## 📂 Codebase Directory Architecture

Below is the directory mapping of the project's layout:

```text
asmant-masr/
├── LANGUAGE_IMPLEMENTATION.md    # API Header translation implementation notes
├── TECH_STACK_AND_SETUP.md       # (This file) Core technical guide
├── tailwind.config.js            # Tailwind & HeroUI plugin configuration
├── postcss.config.mjs            # PostCSS plugin configurations
├── tsconfig.json                 # Custom typescript rules and paths mapping
├── public/                       # Static public assets (images, banners, logos)
│   └── images/
│       └── Home/
└── src/
    ├── app/                      # Next.js App Router root folder
    │   ├── (auth)/               # Route Group for authentication (login, register)
    │   ├── (main)/               # Route Group for main layout (home, prices, news, partners, store, academy)
    │   ├── components/           # UI Components sorted by page context
    │   │   ├── pages/            # Page-specific components (Home, Prices, Store, Producers)
    │   │   └── shared/           # Global shared components (Navbar, Footer, Search)
    │   ├── globals.css           # Global stylesheets, tailwind imports, and root keyframes
    │   ├── layout.tsx            # Global HTML wrapper
    │   └── page.tsx              # Application entrypoint (redirects/render)
    ├── contexts/                 # Global React Context providers (Language, Auth)
    └── lib/                      # Core business logic helpers
        ├── api/                  # Modular backend API endpoints integration
        ├── fetchWithLanguage.ts  # Standard localized fetch wrapper
        └── validation.ts         # Global form input schemas (Yup models)
```

---

## ⚡ Installation and Local Setup

Follow these instructions to set up the development environment locally.

### 📋 Prerequisites
Make sure the following software is installed on your local computer:
*   **Node.js**: `v18.x` or `v20.x` (Long-Term Support version recommended)
*   **npm**: `v9.x` or higher (usually packaged with Node.js)

### 📥 1. Clone & Open Directory
Open your terminal or command prompt inside the project folder:
```powershell
cd d:\qualidev\asmant-masr
```

### 📦 2. Install Project Dependencies
To install all required packages and dependencies, run:
```bash
npm install
```

> [!NOTE]
> If you encounter version-matching conflicts caused by React 19 beta or pre-releases, append the `--legacy-peer-deps` flag:
> ```bash
> npm install --legacy-peer-deps
> ```

---

## 🚀 Running the Application

Use the following scripts defined in `package.json` to run and compile the application.

### 1. Running the Development Server
To launch the project in development mode with Next.js **Turbopack** compilation (which provides extremely fast hot module reloading):
```bash
npm run dev
```
Once started, the development server will be hosted at:
*   **URL**: [http://localhost:3000](http://localhost:3000)

### 2. Code Quality & Linting
Verify TypeScript code standards and quality using ESLint:
```bash
npm run lint
```

### 3. Production Build & Optimization
Before deploying to production, compile the application into an optimized build:
```bash
npm run build
```

### 4. Running the Production Server
To preview the optimized production build locally on port `3000`:
```bash
npm run start
```

---

## 💡 Developer Guidelines & How-Tos

### A. How to Add a New Translation Key
To add a localized word or text string, edit `src/contexts/LanguageContext.tsx`:
1. Find `translationsAr` and add your Arabic key/value pair.
2. Find `translationsEn` and add your English key/value pair.
3. Access it in your component using the translation hook:
   ```tsx
   import { useLanguage } from "@/contexts/LanguageContext";

   const { t } = useLanguage();
   return <h2>{t("footer.my_new_key")}</h2>;
   ```

### B. Performing Localized API Requests
Always use `fetchWithLanguage` from `@/lib/fetchWithLanguage` for backend API interactions. It guarantees the user's language selection is passed to the server via headers automatically.
```typescript
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";

export async function fetchStoreProducts() {
  const response = await fetchWithLanguage("https://api.asmantmasr.com/products");
  return response.json();
}
```
