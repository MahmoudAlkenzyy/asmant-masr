# Language Switcher Implementation Guide

## Overview

This document provides instructions for updating all API fetch calls to include the `Accept-Language` header based on the selected language.

## What Has Been Implemented

### 1. Language Context (`src/contexts/LanguageContext.tsx`)

- Manages language state (ar/en)
- Provides translation function `t(key)`
- Persists language preference in localStorage
- Updates document direction (RTL/LTR) and lang attribute

### 2. Fetch Wrapper (`src/lib/fetchWithLanguage.ts`)

- Custom fetch function that automatically adds `Accept-Language` header
- Gets language from localStorage
- Can be used as a drop-in replacement for native fetch

### 3. NavBar Updates

- Added language switcher button with globe icon
- Desktop: Button next to login button
- Mobile: Button at bottom of mobile menu
- All navigation links now use translation keys

### 4. Updated API Files

- `src/lib/api/traderCategories.ts` - Updated to use `fetchWithLanguage`
- `src/lib/api/store.ts` - Updated to use `fetchWithLanguage`

## How to Update Other Fetch Calls

### Step 1: Import the fetch wrapper

```typescript
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
```

### Step 2: Replace fetch with fetchWithLanguage

**Before:**

```typescript
const res = await fetch("https://api.example.com/endpoint", {
  method: "GET",
  headers: {
    accept: "text/plain",
    Authorization: "Bearer token",
  },
});
```

**After:**

```typescript
const res = await fetchWithLanguage("https://api.example.com/endpoint", {
  method: "GET",
  headers: {
    accept: "text/plain",
    Authorization: "Bearer token",
  },
});
```

The `fetchWithLanguage` function will automatically add the `Accept-Language` header based on the current language setting.

## Files That Need to Be Updated

Based on the grep search, the following files contain fetch calls that should be updated:

### High Priority (Component Files)

1. `src/app/page.tsx` - Home page data fetch
2. `src/app/(main)/partener/page.tsx` - Partners page (2 fetch calls)
3. `src/app/(main)/new/[id]/page.tsx` - News detail page
4. `src/app/(auth)/login/page.tsx` - Login API call

### Component Files

5. `src/app/components/pages/store/Tabs.tsx`
6. `src/app/components/pages/store/StoreTab.tsx`
7. `src/app/components/pages/Producers/Tabs.tsx`
8. `src/app/components/pages/Producers/ProducerTab.tsx`
9. `src/app/components/pages/Prices/PriceAccordion.tsx` (2 fetch calls)
10. `src/app/components/pages/Partener/Tabs.tsx`
11. `src/app/components/pages/Partener/PartenerTab.tsx`
12. `src/app/components/pages/News/Tabs.tsx`

## Adding Translations

To add new translations, update the `translationsAr` and `translationsEn` objects in `src/contexts/LanguageContext.tsx`:

```typescript
const translationsAr: Record<string, string> = {
  "key.name": "النص بالعربية",
  // ... more translations
};

const translationsEn: Record<string, string> = {
  "key.name": "Text in English",
  // ... more translations
};
```

## Using Translations in Components

```typescript
import { useLanguage } from "@/contexts/LanguageContext";

function MyComponent() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t("key.name")}</h1>
      <p>Current language: {language}</p>
    </div>
  );
}
```

## Testing

1. Open the website
2. Click the language switcher button in the header
3. Verify that:
   - The page reloads
   - Navigation text changes to the selected language
   - API calls include the correct `Accept-Language` header
   - Document direction changes (RTL for Arabic, LTR for English)

## Notes

- The language preference is stored in localStorage
- When language changes, the page reloads to fetch new data with the correct language header
- The document direction and lang attribute are automatically updated
- All API calls using `fetchWithLanguage` will automatically include the `Accept-Language` header
