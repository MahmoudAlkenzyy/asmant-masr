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
  "common.no_data": "لا توجد بيانات متاحة",
  "common.no_results": "لا توجد نتائج مطابقة للبحث.",
  "common.all": "الكل",
  "common.no_producers": "لا يوجد منتجون.",
  "common.register_now": "سجل الآن",
  "common.name": "الاسم",
  "common.email": "البريد الإلكتروني",
  "common.attach_cv": "إرفاق السيرة الذاتية",
  "common.attach_cv_pdf": "إرفاق ملف السيرة الذاتية (PDF)",
  "common.register": "تسجيل",
  "common.name_required": "الاسم مطلوب",
  "common.invalid_email": "بريد إلكتروني غير صالح",
  "common.email_required": "البريد مطلوب",
  "common.cv_required": "يرجى إرفاق السيرة الذاتية",
  "common.rise": "ارتفاع",
  "common.fall": "انخفاض",

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

  // Hero Slider
  "hero.slide1.title": "أهم أخبار صناعة الأسمنت في مصر والعالم",
  "hero.slide1.button": "تصفح الأخبار",
  "hero.slide2.title": "أسعار الأسمنت لحظة بلحظة من مصادرها",
  "hero.slide2.button": "تصفح الأسعار",
  "hero.slide3.title": "لأول مرة في مصر .. نقلة الأسمنت بقت أون لاين",
  "hero.slide3.button": "تصفح متجرنا",
  "hero.slide4.title": "خبراء الدعم الفني و الصيانة و موردي قطع الغيار و الخامات",
  "hero.slide4.button": "تصفح شركاء الصناعة",
  "hero.slide5.title": "أهم منتجين الأسمنت في مصر",
  "hero.slide5.button": "تصفح المنتجين",

  // Home News section
  "home.news.title": "الأخبار",
  "home.news.subtitle": "أهم الأخبار",

  // Home Store section
  "home.store.title": "المتجر",
  "home.store.subtitle": "انواع الأسمنت",

  // Home Producers section
  "home.producers.title": "المنتجين",
  "home.agents.title": "الوكلاء و الموزعون",

  // Home Prices section
  "home.prices.title": "الأسعار ",
  "home.prices.button": "تصفح الأسعار",

  // Home Podcasts / Forum section
  "home.forum.title": "منتدى أسمنت مصر",
  "home.forum.subtitle": "أحدث اللقاءات",

  // Academy section
  "academy.title_line1": "أكاديمية",
  "academy.title_line2": "أسمنت مصر",
  "academy.description": "قم بالتسجيل الان في التدريبات الصيفيه للحصول علي خبرات جديده في هذا المجال إنضم لنا الان!",
  "academy.join_now": "إنضم لنا الان",

  // Footer
  "footer.subscribe_title": "إشترك لمعرفة التحديثات الجديدة",
  "footer.subscribe_btn": "إشترك الأن",
  "footer.email_placeholder": "البريد الإلكتروني",
  "footer.name_placeholder": "الإسم الأول",
  "footer.company": "الشركة",
  "footer.home": "الصفحة الرئيسية",
  "footer.prices": "الأسعار",
  "footer.news": "الأخبار",
  "footer.partners_producers": "المنتجين وشركاء النجاح",
  "footer.forum": "منتدى اسمنت مصر",
  "footer.store": "المتجر",
  "footer.academy": "أكاديمية اسمنت مصر",
  "footer.news_section": "الأخبار",
  "footer.general_news": "أخبار عامة",
  "footer.cement_news": "أخبار الأسمنت",
  "footer.egypt_news": "الأخبار",
  "footer.world_news": "أخبار الأسمنت حول العالم",
  "footer.material_prices": "أسعار المواد",
  "footer.cement": "أسمنت",
  "footer.iron": "حديد",
  "footer.gypsum": "جبس",
  "footer.community": "مجتمع أسمنت مصر",
  "footer.jobs": "وظائف أسمنت مصر",
  "footer.deals": "صفقات أسمنت مصر",
  "footer.description": "الموقع الأول المتخصص في صناعة الأسمنت والصناعات الاقتصادية المختلفة",

  // Partner Tabs
  "partner.tab.technical": "التقنيين",
  "partner.tab.commercial": "تجاريين",
  "partner.tab.suppliers": "موردين",

  // Community / About / Vision page
  "community.vision_title": "الرؤيا",
  "community.vision_text":
    "ان تصبح منصتنا هي المصدر الأول والأكثر ثقة ومصداقية وتطورا لكل ما يتعلق بصناعة البناء والاسمنت مما يساهم في تقديم البيانات والمعولمات الدقيقة عن السوق المصري المتشعب مما يساعد كلا من رجال الصناعة في مختلف المجالات المتعلقة بهذه الصناعة والمستخدم الذي يستخدم منصتنا علي ثقة تامة من ان المعلومات التي ترد اليه علي صفحاتنا تقوم بمساعدته في اتخاذ قراراته الخاصة الصحيحة في هذه الصناعة الكبيرة مع تقديم كل ما لدينا من خبرات في المجال التكنلوجي لتعزيز الاستدامة والابتكار لتلبية طلبات السوق المحلية في المرحلة الاولي وبعدها انطلاقا الي السوق العربية والعالمية",
  "community.mission_title": "الرسالة",
  "community.mission_text":
    "تقديم خدمة غير مسبوقة في مجال صناعة الاسمنت والصناعات المرتبطة به من خلال التقنيات الحديثة واستخدام أدوات الذكاء الصناعي لتقديم خدمات ومعلومات موثوقة ومقدمة بشكل تحليلي يستطيع من خلاله كل من يتعامل مع منصتنا ان يتخد قراراته التجارية بناء علي ارقام وتحليلات ومعلومات تقدم له في قالب سهل ومريح وموثوق ومعتمدا علي افضل الوسائل التكنلوجية الحديثة بما يساعد في تطوير وازدهار هذه الصناعة بشكل مختلف وغير مسبوق",
  "community.goals_title": "الأهداف الرئيسية",
  "community.company_info_title": "معلومات عن الشركة",
  "community.goal1":
    "توفير منصة موثوقة معتمدة لتقديم وتبادل المعرفة والاخبار في محيط صناع الاسمنت بشكل غير مسبوق في مصر",
  "community.goal2":
    "التعريف بفرص الاستثمار الجديدة في هذه الصناعة مما يساعد علي تعاظم قدرات هذه الصناعة علي جميع المجالات المرتبطة بها",
  "community.goal3":
    "تقديم خدمة الكترونية غير مسبوقة في مصر والوطن العربي لعمل الربط المعرفي الغائب بين المستخدم ورجال وأدوات هذه الصناعة في مصر",
  "community.goal4":
    "تقديم محتوي تحليلي مختلف شديد الخصوصية وشديد التركيز علي هذه الصناعة المتأصلة في مصر بما يساعد علي الاستدامة والتطور المعرفي لكلا من العاملين في مجال هذه الصناعة والمستهلك علي حد سواء مستعينا بكل أدوات التطور التكنولوجي بما فيها أدوات الذكاء الصناعي وتحليل البيانات بشكل مختلف وغير مسبوق",
  "community.goal5":
    "انشاء اكبر سوق الكتروني لتداول والتعامل في منتجات الاسمنت المختلفة الي جانب منتجات البناء الأخرى بشكل لم يسبق له مثيل للمستخدم المصري والعربي مما يسهل عملية التداول ويفتح افاقا كبري لكلا من العاملين في مجال الاسمنت والمستخدم الأخير الذي يسعي للحصول علي المنتج الخاص به بشكل سهل ودون تعقيد وبشكل امن في تجربة هي الاولي علي المستوي المحلي والعربي",
  "community.info1": "توصيل جميع الفرص والعروض المتاحة في الصناعة إلى جميع المستفيدين منها",
  "community.info2": "توفير جميع الخدمات والمعلومات اللازمة للصناعة بكاملها",
  "community.info3": "الوصول إلى جميع المستفيدين في صناعة الأسمنت، محلياً ودولياً",
  "community.info4": "الاتصال وإقامة شبكة علاقات مع الصناعة والمستفيدين منها",
  "community.info5": "إعلام جميع المستفيدين بآخر المستجدات بالصناعة أولا بأول",
  "community.info6": "إقامة تحالفات استراتيجية ومشاركات مع اللاعبين الأساسيين في الصناعة",
  "community.info7": "الإعلان، ونشر الدوريات، وتنظيم الأحداث",

  // Store Content
  "store.filter_by_city": "تصفية حسب المدينة",
  "store.filter_by_type": "تصفية حسب النوع",
  "store.choose_city": "أختر المدينة",
  "store.choose_type": "أختر النوع",
  "store.no_products_match": "لا توجد منتجات تطابق اختياراتك",
  "store.reset_filters": "إعادة تعيين المرشحات",
  "store.no_products": "لا يوجد منتجات متاحة.",
  "store.order_type": "النوع",
  "store.order_location": "إختر المكان",
  "store.order_category": "إختر الصنف",
  "store.order_quantity": "الكمية",
  "store.order_total": "إجمالي السعر",
  "store.order_unit": "طن",
  "store.order_btn": "طلب الصفقة",
  "store.order_success": "تم طلب الصفقة بنجاح",
  "store.title": "المتجر",
  "store.subtitle": "انواع الاسمنت",
  "store.currency": "جنيه",

  // Login Page
  "login.title": "تسجيل الدخول",
  "login.no_account": "لا يوجد لديك حساب؟",
  "login.register_now": "تسجيل الآن",
  "login.email": "البريد الإلكتروني",
  "login.email_placeholder": "ادخل بريدك الإلكتروني",
  "login.password": "الرقم السري",
  "login.password_placeholder": "ادخل الرقم السري",
  "login.remember_me": "تذكرني",
  "login.forgot_password": "نسيت كلمة السر؟",
  "login.submit": "تسجيل الدخول",
  "login.loading": "جارٍ تسجيل الدخول...",
  "login.success": "تم تسجيل الدخول بنجاح!",
  "login.failed": "فشل تسجيل الدخول، تأكد من البريد الإلكتروني أو كلمة المرور.",
  "login.server_error": "حدث خطأ أثناء الاتصال بالخادم.",

  // Register Page
  "register.title": "تسجيل جديد",
  "register.have_account": "يوجد لديك حساب؟",
  "register.login_now": "تسجيل الدخول",
  "register.full_name": "الاسم الكامل",
  "register.full_name_placeholder": "أدخل اسمك الكامل",
  "register.phone_placeholder": "أدخل رقم هاتفك",
  "register.confirm_password": "تأكيد كلمة المرور",
  "register.confirm_password_placeholder": "أعد إدخال كلمة المرور",
  "register.password_mismatch": "كلمتا المرور غير متطابقتين",
  "register.submit": "تسجيل جديد",
  "register.loading": "جارٍ التسجيل...",
  "register.success": "تم التسجيل بنجاح!",
  "register.failed": "فشل التسجيل، تحقق من البيانات",
  "register.name_required": "الاسم مطلوب",
  "register.phone_required": "رقم الهاتف مطلوب",
  "register.phone_invalid": "رقم الهاتف غير صحيح (مثال: 01012345678)",
  "register.passwords_match": "كلمتا المرور متطابقتان",
  "register.validation_errors": "يرجى تصحيح الأخطاء التالية:",

  // Our Vision page
  "vision.credibility_title": "المصداقية",
  "vision.credibility_text1":
    "نشتشرف باننا الموقع الوحيد داخل جمهورية مصر العربية الحاصل علي الموافقة الرسمية من الجهات المسئولة لجمع ونشر أسعار مواد البناء وذلك وفقا للتصريح رقم ........... لعام .....",
  "vision.credibility_text2":
    "ونحن نلتزم بتقديم هذه البيانات المصرح لنا بجمعها للمستهلك ولشركاء الصناعة بشكل دوري علي موقعنا مما يساهم في تطور صناعة الاسمنت ومواد البناء في مصر توافقا مع سياسات الدولة الرامية الي تطوير مناحي الصناعات المختلفة في مصر",
  "vision.about_title": "عن موقعنا",
  "vision.about_text1":
    "ان موقعنا هو موقع الكتروني ومنصة معنية بصناعة الاسمنت والصناعات الاقتصادية المرتبطة به ونهدف من خلال هذا الموقع توفير الدعم الشامل لهذه الصناعة الحيوية",
  "vision.about_text2":
    "يسعي موقعنا الي ان يكون الوجهة الأولي لدي الأطراف العاملين والمتعاملين في مجال الاسمنت بما يحقق فرصة غير مسبوقة للتواصل بين كلا من المصنعين والموردين والمستثمرين والباحثين عن حلول مستدامة وفعالة في مجال صناعة الاسمنت تماشيا مع خطة الدولة الطموحة لتطوير جميع الصناعات وتقديم شكل تقني مختلف للمستخدم والعاملين في الصناعة يساعد علي تسهيل وتلبية طلب السوق والمصنعين معا في تواصل سهل ومريح ومعلومات موثوقة للأطراف العاملة والمستهلكة علي حد سواء",
  "vision.about_text3":
    "نسعي من خلال هذه رؤيتنا ان نساهم بقدر كبير في دعم صناعة الاسمنت والصناعت الاقتصادية المرتبطة به بحيث نقدم تجربة فريدة في هذه الصناعة التي تحتل فيها مصر مكانة رفيعة في العالم وبالتالي نسعي جاهدين لنواكب تطور هذه الصناعة عالميا بصبغة مصرية خالصة تساعد في النهوض والتطور لهذه الصناعة في مصر",

  // Disclaimer (our-responsibility) page
  "disclaimer.title": "اخلاء المسئولية",
  "disclaimer.intro":
    "وحيث اننا نمتلك تصريحا رسميا بجمع البيانات الخاصة بتغير أسعار مواد البناء في مصر وانطلاقا من سياستنا القائمة علي تقديم خدمة مميزة لكلا من المستخدمين والعملاء فإننا نهيب بالجميع ملاحظة ما يلي :",
  "disclaimer.first": "أولا :",
  "disclaimer.first_text":
    "تراعي إدارة الموقع التأكد من صحة ودقة البيانات والمعلومات المتاحة من المصادر الموثوق منها وبالتالي فان كافة المعولمات والبيانات المنشورة علي الموقع صحيحة من وجهة نظر الموقع والقائمين عليه مؤكدين التزامنا بالتنويه المباشر عنذ تغيير تلك البيانات ا او الملعومات لتسهيل وصول المعلومات الجديدة للمستخدم والعملاء في اسرع وقت ممكن",
  "disclaimer.second": "ثانيا :",
  "disclaimer.second_text":
    "حدوث أي خطأ في البيانات المنشورة علي الموقع ( ان حدث ) فهو نتيجة السهو وليس لإدارة الموقع أي مصلحة في نشر معلومات او بيانات غير صحيحة او غير دقيقة . وبالتالي فان حدوث أي خطأ في هذه البيانات المنسوبة الي مصرد ما فإن مسئولية هذه البيانات تقع مباشرة علي المصدر وحده والموقع غير مسئول عن أي خطأ يرد في البيانات المنشورة علي الموقع والمنسوبة لمصدر ما بعينه",
  "disclaimer.third": "ثالثا :",
  "disclaimer.third_text":
    "ان ما يقوم بنشره الموقع من بيانات ومعلومات لا يعد توصية من الموقع لاي جهة كانت او أي شخص كان باتخاذ أي قرارر تجاري او استثماري معين خاص به .. والموقع غير مسئول اطلاقا عن أي تبعات قانونية او قرارات استثمارية او خسائر نتجت عن اتخاذ المستخدم للموقع هذه البيانات او المعلومات علي انه توصية من اجل اتخاذ قرار تجاري او استثماري أيا كان نوعه",
  "disclaimer.fourth": "رابعا :",
  "disclaimer.fourth_text":
    "وبناء عليه فان المستخدم يتحمل المسئولية كاملة عن قراراته او تحركاته التي نتجت عن تقييمه الشخصي لهذه البيانات والمعلومات والمواد المنشورة علي الموقع دون ادني مسئولية أدبية او قانونية علي الموقع وبالتالي فان إدارة الموقع تنصح المستخدم الكريم في تحري الدقة واستشارة أصحاب الرأي الفني المناسب قبل اتخاذ أي قرار او اجراء يتعلق بايا من المعلومات او البيانات المنشورة علي الموقع",
  "disclaimer.fifth": "خامسا :",
  "disclaimer.fifth_text":
    "الموقع والشركة المالكة له او المملوكة له او الشركات الشقيقة او ادارته او موظفيه او وكلاءه او الموزعين او الأطراف الثالثة التي تزوده بالمعولمات او تسمح له باستخدام وإعادة نشر هذه المعلومات او تقديم محتوي مبني علي هذه المعلومات لن يكونوا مسئولين باي شكل من الاشكال عن كيفية استخدام واستعمال هذا المحتوي وهذه المعلومات من قبل المستخدم الذي يتحمل المسئولية كاملة عن طريقة استخدامه لهذه البيانات دون أي مسئولية عن الأطراف السابق ذكرها عن هذا الاستخدام من قبل المستخدم",

  // News Card
  "newscard.listen_podcast": "الإستماع الي البودكاست",
  "newscard.subtitle": "الصناع يواجهون نقص الأيدي العاملة الماهرة بسبب الهجرة",
  "newscard.no_news": "لا توجد أخبار متاحة",

  // Partners page
  "partner.no_partners": "لا يوجد شركاء متاحين.",

  // Store Card
  "storecard.product": "المنتج",
  "storecard.type": "النوع",
  "storecard.city": "المحافظة",
  "storecard.trade": "الصنف",
  "storecard.quantity": "الكمية",
  "storecard.company": "الشركة",
  "storecard.request_deal": "طلب صفقة",

  // Auth overlay
  "store.login_required_title": "تسجيل الدخول مطلوب",
  "store.login_required_desc": "يجب عليك تسجيل الدخول أولاً للوصول إلى المتجر وتصفح المنتجات",
  "store.select_city_first": "اختر المدينة أولاً",
  "store.select_company_first": "اختر الشركة أولاً",
  // Order form sections
  "store.section_product": "تفاصيل المنتج",
  "store.section_customer": "بيانات العميل",
  "store.customer_name": "الاسم الكامل",
  "store.customer_phone": "رقم الهاتف",
  "store.shipping_address": "عنوان الشحن",
  "store.fill_all_fields": "يرجى اكتمال جميع الحقول",
  "store.order_failed": "فشل إرسال الطلب، حاول مرة أخرى",

  // Navbar logout
  "nav.logout": "تسجيل الخروج",
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
  "common.no_data": "No data available",
  "common.no_results": "No matching data found.",
  "common.all": "All",
  "common.no_producers": "No producers found.",
  "common.register_now": "Register Now",
  "common.name": "Name",
  "common.email": "Email",
  "common.attach_cv": "Attach CV",
  "common.attach_cv_pdf": "Attach CV File (PDF)",
  "common.register": "Register",
  "common.name_required": "Name is required",
  "common.invalid_email": "Invalid email address",
  "common.email_required": "Email is required",
  "common.cv_required": "Please attach your CV",
  "common.rise": "Rise",
  "common.fall": "Fall",

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

  // Hero Slider
  "hero.slide1.title": "Top News in Egypt's Cement Industry",
  "hero.slide1.button": "Browse News",
  "hero.slide2.title": "Cement Prices — Live & From the Source",
  "hero.slide2.button": "Browse Prices",
  "hero.slide3.title": "For the First Time in Egypt — Cement is Now Online",
  "hero.slide3.button": "Visit Our Store",
  "hero.slide4.title": "Technical Support Experts, Maintenance & Spare Parts Suppliers",
  "hero.slide4.button": "Browse Industry Partners",
  "hero.slide5.title": "Top Cement Producers in Egypt",
  "hero.slide5.button": "Browse Producers",

  // Home News section
  "home.news.title": "News",
  "home.news.subtitle": "Top Stories",

  // Home Store section
  "home.store.title": "Store",
  "home.store.subtitle": "Types of Cement",

  // Home Producers section
  "home.producers.title": "Producers",
  "home.agents.title": "Agents & Distributors",

  // Home Prices section
  "home.prices.title": "Material Prices",
  "home.prices.button": "Browse Prices",
  // Home Podcasts / Forum section
  "home.forum.title": "Cement Egypt Forum",
  "home.forum.subtitle": "Latest Sessions",

  // Academy section
  "academy.title_line1": "Academy",
  "academy.title_line2": "Cement Egypt",
  "academy.description":
    "Register now for the summer training programs to gain new experience in this field. Join us now!",
  "academy.join_now": "Join Us Now",

  // Footer
  "footer.subscribe_title": "Subscribe to Get the Latest Updates",
  "footer.subscribe_btn": "Subscribe Now",
  "footer.email_placeholder": "Email Address",
  "footer.name_placeholder": "First Name",
  "footer.company": "Company",
  "footer.home": "Home",
  "footer.prices": "Prices",
  "footer.news": "News",
  "footer.partners_producers": "Producers & Partners",
  "footer.forum": "Cement Egypt Forum",
  "footer.store": "Store",
  "footer.academy": "Cement Egypt Academy",
  "footer.news_section": "News",
  "footer.general_news": "General News",
  "footer.cement_news": "Cement News",
  "footer.egypt_news": "News",
  "footer.world_news": "Global Cement News",
  "footer.material_prices": "Material Prices",
  "footer.cement": "Cement",
  "footer.iron": "Steel",
  "footer.gypsum": "Gypsum",
  "footer.community": "Cement Egypt Community",
  "footer.jobs": "Cement Egypt Jobs",
  "footer.deals": "Cement Egypt Deals",
  "footer.description": "The leading specialized platform for Egypt's cement industry and related economic sectors",

  // Partner Tabs
  "partner.tab.technical": "Technical",
  "partner.tab.commercial": "Commercial",
  "partner.tab.suppliers": "Suppliers",

  // Community / About / Vision page
  "community.vision_title": "Our Vision",
  "community.vision_text":
    "To make our platform the most trusted, credible, and advanced source for everything related to the construction and cement industry, contributing to providing accurate data and information about the diverse Egyptian market. This helps industry professionals across various related fields, as well as users who trust our platform, to make the right decisions using information delivered to them on our pages — all while leveraging our technological expertise to promote sustainability and innovation, meeting local market demands first, then expanding to the Arab and global markets.",
  "community.mission_title": "Our Mission",
  "community.mission_text":
    "To deliver an unprecedented service in the cement industry and its related sectors through modern technologies and artificial intelligence tools, providing reliable and analytically presented information and services. This enables everyone who interacts with our platform to make their business decisions based on numbers, analyses, and information presented in an easy, comfortable, and trusted format — relying on the best modern technological tools to help develop and advance this industry in a different and unprecedented way.",
  "community.goals_title": "Main Objectives",
  "community.company_info_title": "About the Company",
  "community.goal1":
    "Providing a trusted and accredited platform for sharing knowledge and news within the cement manufacturing community in an unprecedented way in Egypt",
  "community.goal2":
    "Introducing new investment opportunities in this industry, helping to enhance its capabilities across all related fields",
  "community.goal3":
    "Delivering an unprecedented electronic service in Egypt and the Arab world to bridge the knowledge gap between users and the professionals and tools of this industry in Egypt",
  "community.goal4":
    "Delivering unique analytical content with exceptional focus on this deeply rooted industry in Egypt, supporting the sustainability and knowledge development of both industry professionals and consumers alike, using all tools of technological advancement including AI and data analysis in a different and unprecedented way",
  "community.goal5":
    "Establishing the largest electronic marketplace for trading and dealing in various cement products alongside other construction materials — an experience unlike any before for Egyptian and Arab users — making trading easier and opening vast horizons for both professionals in the cement field and end consumers seeking their products easily, without complications, and securely",
  "community.info1": "Connecting all available opportunities and offers in the industry to all beneficiaries",
  "community.info2": "Providing all services and information necessary for the entire industry",
  "community.info3": "Reaching all beneficiaries in the cement industry, locally and internationally",
  "community.info4": "Communicating and building a network of relationships with the industry and its stakeholders",
  "community.info5": "Informing all beneficiaries of the latest industry developments in real time",
  "community.info6": "Establishing strategic alliances and partnerships with key players in the industry",
  "community.info7": "Advertising, publishing periodicals, and organizing events",

  // Store Content
  "store.filter_by_city": "Filter by City",
  "store.filter_by_type": "Filter by Type",
  "store.choose_city": "Choose City",
  "store.choose_type": "Choose Type",
  "store.no_products_match": "No products match your selection",
  "store.reset_filters": "Reset Filters",
  "store.no_products": "No products available.",
  "store.order_type": "Type",
  "store.order_location": "Choose Location",
  "store.order_category": "Choose Category",
  "store.order_quantity": "Quantity",
  "store.order_total": "Total Price",
  "store.order_unit": "Ton",
  "store.order_btn": "Request Deal",
  "store.order_success": "Deal requested successfully",
  "store.title": "Store",
  "store.subtitle": "Types of Cement",
  "store.currency": "EGP",

  // Login Page
  "login.title": "Login",
  "login.no_account": "Don't have an account?",
  "login.register_now": "Register Now",
  "login.email": "Email Address",
  "login.email_placeholder": "Enter your email",
  "login.password": "Password",
  "login.password_placeholder": "Enter your password",
  "login.remember_me": "Remember me",
  "login.forgot_password": "Forgot password?",
  "login.submit": "Login",
  "login.loading": "Logging in...",
  "login.success": "Logged in successfully!",
  "login.failed": "Login failed. Check your email or password.",
  "login.server_error": "A server error occurred. Please try again.",

  // Register Page
  "register.title": "Register",
  "register.have_account": "Already have an account?",
  "register.login_now": "Login",
  "register.full_name": "Full Name",
  "register.full_name_placeholder": "Enter your full name",
  "register.phone_placeholder": "Enter your phone number",
  "register.confirm_password": "Confirm Password",
  "register.confirm_password_placeholder": "Re-enter your password",
  "register.password_mismatch": "Passwords do not match",
  "register.submit": "Register",
  "register.loading": "Registering...",
  "register.success": "Registered successfully!",
  "register.failed": "Registration failed. Please check your details.",
  "register.name_required": "Name is required",
  "register.phone_required": "Phone number is required",
  "register.phone_invalid": "Invalid phone number (example: 01012345678)",
  "register.passwords_match": "Passwords match",
  "register.validation_errors": "Please fix the following errors:",

  // Our Vision page
  "vision.credibility_title": "Credibility",
  "vision.credibility_text1":
    "We are proud to be the only website in Egypt that holds official approval from the responsible authorities to collect and publish building material prices, pursuant to License No. ........... for the year .....",
  "vision.credibility_text2":
    "We are committed to periodically providing these officially authorized data to consumers and industry partners on our platform, contributing to the development of the cement and building materials industry in Egypt in line with the state's policies for advancing various industries.",
  "vision.about_title": "About Our Platform",
  "vision.about_text1":
    "Our platform is a website and digital hub dedicated to the cement industry and its related economic sectors. We aim to provide comprehensive support to this vital industry.",
  "vision.about_text2":
    "Our platform strives to be the first destination for all players in the cement industry — creating an unprecedented opportunity for manufacturers, suppliers, investors, and those seeking sustainable solutions in the sector, in line with the state's ambitious plan to develop all industries.",
  "vision.about_text3":
    "Through our vision, we aim to significantly support the cement industry and its related economic sectors, offering a unique experience in an industry where Egypt holds a distinguished global position.",

  // Disclaimer page
  "disclaimer.title": "Disclaimer",
  "disclaimer.intro":
    "Since we hold an official license to collect data on building material price changes in Egypt, and in line with our policy of providing a distinguished service to users and clients, we draw everyone's attention to the following:",
  "disclaimer.first": "First:",
  "disclaimer.first_text":
    "The website management ensures the accuracy of data and information from trusted sources. All published data is correct from the website's perspective, and we are committed to promptly notifying users of any changes.",
  "disclaimer.second": "Second:",
  "disclaimer.second_text":
    "Any errors in published data (if they occur) are due to oversight, and the website management has no interest in publishing incorrect or inaccurate information. Responsibility for any attributed data error falls solely on the source, not the website.",
  "disclaimer.third": "Third:",
  "disclaimer.third_text":
    "Data and information published by the website do not constitute a recommendation by the website to any party to make a specific commercial or investment decision. The website is not liable for any legal consequences, investment decisions, or losses resulting from treating published data as a recommendation.",
  "disclaimer.fourth": "Fourth:",
  "disclaimer.fourth_text":
    "The user bears full responsibility for decisions or actions resulting from their personal evaluation of published data and information, with no moral or legal liability on the website. The website management advises users to verify accuracy and consult appropriate technical experts before making any decisions.",
  "disclaimer.fifth": "Fifth:",
  "disclaimer.fifth_text":
    "The website, its owning company, affiliated companies, management, employees, agents, distributors, or third-party information providers shall not be held responsible in any way for how users utilize the published content, as the user bears full responsibility for their use of this data.",

  // News Card
  "newscard.listen_podcast": "Listen to Podcast",
  "newscard.subtitle": "Manufacturers face skilled labor shortage due to emigration",
  "newscard.no_news": "No news available",

  // Partners page
  "partner.no_partners": "No partners available.",

  // Store Card
  "storecard.product": "Product",
  "storecard.type": "Type",
  "storecard.city": "Governorate",
  "storecard.trade": "Category",
  "storecard.quantity": "Quantity",
  "storecard.company": "Company",
  "storecard.request_deal": "Request Deal",

  // Auth overlay
  "store.login_required_title": "Login Required",
  "store.login_required_desc": "You must log in first to access the store and browse products",
  "store.select_city_first": "Select city first",
  "store.select_company_first": "Select company first",
  // Order form sections
  "store.section_product": "Product Details",
  "store.section_customer": "Customer Details",
  "store.customer_name": "Full Name",
  "store.customer_phone": "Phone Number",
  "store.shipping_address": "Shipping Address",
  "store.fill_all_fields": "Please fill in all required fields",
  "store.order_failed": "Order failed, please try again",

  // Navbar logout
  "nav.logout": "Logout",
};
