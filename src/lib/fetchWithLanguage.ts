import Cookies from "js-cookie";

export async function fetchWithLanguage(url: string, options: RequestInit = {}): Promise<Response> {
  let language = "ar";
  const token = JSON.parse(localStorage.getItem("cement_auth_user") || "{}").token;
  if (typeof window !== "undefined") {
    // Client-side: check localStorage then cookies
    language = localStorage.getItem("language") || Cookies.get("language") || "ar";
  }
  // Merge headers
  const headers = {
    ...options.headers,
    "Accept-Language": language,
    Authorization: `Bearer ${token}`,
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
