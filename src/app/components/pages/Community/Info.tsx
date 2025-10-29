import React from "react";

export const Info = () => {
  const info = [
    "توصيل جميع الفرص والعروض المتاحة في الصناعة إلى جميع المستفيدين منها",
    "الوصول إلى جميع المستفيدين في صناعة الأسمنت، محلياً ودولياً",
    "توفير جميع الخدمات والمعلومات اللازمة للصناعة بكاملها",
    "إعلام جميع المستفيدين بآخر المستجدات بالصناعة أولا بأول",
    "الاتصال وإقامة شبكة علاقات مع الصناعة والمستفيدين منها",
    "الإعلان، ونشر الدوريات، وتنظيم الأحداث",
    "إقامة تحالفات استراتيجية ومشاركات مع اللاعبين الأساسيين في الصناعة",
  ];
  return (
    <section className="bg-[#E5FBFF] py-14 mt-5">
      <h2 className="text-3xl font-bold text-center mb-20">معلومات عن الشركة</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-9 containerr">
        {info.map((str, idx) => (
          <p
            className={`bg-white text-lg py-9 text-[#292E2B88]  text-center px-6 ${
              idx == 0 && "md:w-1/2 mx-auto md:col-span-2"
            }  `}
          >
            {str}
          </p>
        ))}
      </div>
    </section>
  );
};
