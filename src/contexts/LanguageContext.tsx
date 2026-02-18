"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

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
    // Load language from cookies or localStorage on mount
    const savedLang = (Cookies.get("language") || localStorage.getItem("language")) as Language;
    if (savedLang && (savedLang === "ar" || savedLang === "en")) {
      setLanguageState(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    Cookies.set("language", lang, { expires: 365 });
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

  // Jobs
  "jobs.title": "وظائف أسمنت مصر",
  "jobs.search_job": "البحث عن وظيفة",
  "jobs.announce_job": "إعلان عن وظيفة",
  "jobs.first_name": "الاسم الأول",
  "jobs.last_name": "الاسم الأخير",
  "jobs.phone": "رقم الهاتف",
  "jobs.email": "البريد الإلكتروني",
  "jobs.specialization": "التخصص",
  "jobs.job": "الوظيفة",
  "jobs.experience": "عدد سنين الخبرة",
  "jobs.portfolio": "رابط الأعمال",
  "jobs.attach_cv": "إرفاق السيرة الذاتية",
  "jobs.attach_cv_pdf": "إرفاق ملف السيرة الذاتية (PDF)",
  "jobs.company_name": "اسم الشركة",
  "jobs.job_details": "تفاصيل الوظيفة",
  "jobs.attach_details_pdf": "إرفاق ملف التفاصيل (PDF)",
  "jobs.select_specialization": "اختر التخصص",
  "jobs.select_job": "اختر الوظيفة",
  "jobs.select_experience": "اختر عدد السنوات",
  "jobs.success": "تم إرسال البيانات بنجاح!",
  "jobs.error": "حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.",
  "jobs.required": "مطلوب",
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

  // Jobs
  "jobs.title": "Cement Egypt Jobs",
  "jobs.search_job": "Search for a Job",
  "jobs.announce_job": "Post a Job",
  "jobs.first_name": "First Name",
  "jobs.last_name": "Last Name",
  "jobs.phone": "Phone Number",
  "jobs.email": "Email",
  "jobs.specialization": "Specialization",
  "jobs.job": "Job",
  "jobs.experience": "Years of Experience",
  "jobs.portfolio": "Portfolio Link",
  "jobs.attach_cv": "Attach CV",
  "jobs.attach_cv_pdf": "Attach CV File (PDF)",
  "jobs.company_name": "Company Name",
  "jobs.job_details": "Job Details",
  "jobs.attach_details_pdf": "Attach Details File (PDF)",
  "jobs.select_specialization": "Select Specialization",
  "jobs.select_job": "Select Job",
  "jobs.select_experience": "Select Years",
  "jobs.success": "Data sent successfully!",
  "jobs.error": "An error occurred while sending data. Please try again.",
  "jobs.required": "Required",
};
