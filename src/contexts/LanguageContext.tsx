"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "ar" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Update document direction
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const translations = language === "ar" ? translationsAr : translationsEn;
    return translations[key] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Translation dictionaries
const translationsAr: Record<string, string> = {
  // Navigation
  "nav.home": "الصفحة الرئيسية",
  "nav.prices": "الأسعار",
  "nav.news": "الأخبار",
  "nav.producers": "المنتجين",
  "nav.traders": "التجار",
  "nav.partners": "شركاء الصناعة",
  "nav.cement_egypt": "أسمنت مصر",
  "nav.our_vision": "رؤيتنا",
  "nav.about_us": "عن أسمنت مصر",
  "nav.disclaimer": "اخلاء المسئولية",
  "nav.jobs": "وظائف",
  "nav.store": "المتجر",
  "nav.login": "تسجيل الدخول",
  "nav.local_market": "السوق المحلي",
  "nav.export": "تصدير",

  // Common
  "common.loading": "جاري التحميل...",
  "common.error": "حدث خطأ",
  "common.search": "بحث",
  "common.filter": "تصفية",
  "common.submit": "إرسال",
  "common.cancel": "إلغاء",
  "common.save": "حفظ",
  "common.delete": "حذف",
  "common.edit": "تعديل",
  "common.view": "عرض",
  "common.close": "إغلاق",

  // Add more translations as needed
};

const translationsEn: Record<string, string> = {
  // Navigation
  "nav.home": "Home",
  "nav.prices": "Prices",
  "nav.news": "News",
  "nav.producers": "Producers",
  "nav.traders": "Traders",
  "nav.partners": "Industry Partners",
  "nav.cement_egypt": "Cement Egypt",
  "nav.our_vision": "Our Vision",
  "nav.about_us": "About Cement Egypt",
  "nav.disclaimer": "Disclaimer",
  "nav.jobs": "Jobs",
  "nav.store": "Store",
  "nav.login": "Login",
  "nav.local_market": "Local Market",
  "nav.export": "Export",

  // Common
  "common.loading": "Loading...",
  "common.error": "An error occurred",
  "common.search": "Search",
  "common.filter": "Filter",
  "common.submit": "Submit",
  "common.cancel": "Cancel",
  "common.save": "Save",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.view": "View",
  "common.close": "Close",

  // Add more translations as needed
};
