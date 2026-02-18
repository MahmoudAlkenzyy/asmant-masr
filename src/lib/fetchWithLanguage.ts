/**
 * Custom fetch wrapper that automatically includes Accept-Language header
 */
import Cookies from "js-cookie";

export async function fetchWithLanguage(url: string, options: RequestInit = {}): Promise<Response> {
  let language = "ar";

  if (typeof window !== "undefined") {
    // Client-side: check localStorage then cookies
    language = localStorage.getItem("language") || Cookies.get("language") || "ar";
  } else {
    // Server-side: check headers if possible, or we'd need to pass it.
    // In Next.js App Router, we can use headers() or cookies() from 'next/headers'
    // but this function is a generic helper.
    // For now, it will default to 'ar' unless we find another way.
    // A better way would be to pass the language to the function if called on server.
  }

  // Merge headers
  const headers = {
    ...options.headers,
    "Accept-Language": language,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Get the current language for API calls
 */
export function getCurrentLanguage(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || Cookies.get("language") || "ar";
  }
  return "ar";
}

/**
 * Get Accept-Language header value
 */
export function getLanguageHeader(): string {
  return getCurrentLanguage();
}
