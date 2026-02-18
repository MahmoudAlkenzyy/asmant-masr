/**
 * Custom fetch wrapper that automatically includes Accept-Language header
 */

export async function fetchWithLanguage(url: string, options: RequestInit = {}): Promise<Response> {
  // Get language from localStorage
  const language = typeof window !== "undefined" ? localStorage.getItem("language") || "ar" : "ar";

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
    return localStorage.getItem("language") || "ar";
  }
  return "ar";
}

/**
 * Get Accept-Language header value
 */
export function getLanguageHeader(): string {
  return getCurrentLanguage();
}
