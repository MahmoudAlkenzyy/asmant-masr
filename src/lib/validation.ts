/**
 * Shared form validation helpers
 */

/** Egyptian mobile: 01[0125] + 8 digits = 11 total */
const EG_PHONE_RE = /^01[0-9]{9}$/;
/** International: optional + then 7-15 digits / spaces / dashes */
const INTL_PHONE_RE = /^\+?[\d\s\-]{7,15}$/;

export function isValidPhone(value: string): boolean {
  const clean = value.replace(/\s/g, "");
  return EG_PHONE_RE.test(clean) || INTL_PHONE_RE.test(clean);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}
