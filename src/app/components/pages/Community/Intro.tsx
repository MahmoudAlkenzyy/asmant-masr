import Image from "next/image";
import React from "react";

export const Intro = () => {
  return (
    <section dir="rtl" className=" py-28">
      <div className="flex flex-col md:flex-row containerr">
        <div className="md:w-1/2 w-full">
          <h2 className="text-4xl md:text-7xl font-bold mb-14 ">مقدمة</h2>
          <p className="text-[#292E2B] opacity-50 text-2xl  leading-16 mb-20">
            سيقوم موقع أسمنت مصر بمخاطبة الكيان المعرفي لجميع المرتبطين بصناعة الأسمنت، وذلك من خلال توفير المعلومات
            والأدوات الضرورية لمشاهدة الصورة الكبيرة للصناعة، وذلك بالإضافة لتقوية قدرتهم على متابعة جميع أنماط التطور
            في الصناعة. ومن خلال جهوده، سيقوم أسمنت مصر بالعمل على بناء قاعدة بيانات كمرجع لصناعة الأسمنت وأصحاب المصالح
            الخاصة بها.
          </p>
          <h2 className="text-4xl md:text-4xl  mb-14 ">الرؤية</h2>
          <p className="text-[#292E2B] opacity-50 text-2xl  leading-16 mb-20">
            يسعى موقع أسمنت مصر لكي يصبح الموقع الرائد في خدمة ودعم صناعة الأسمنت في الشرق الأوسط وشمال أفريقيا. وللوصول
            إلى ذلك، يجاهد الموقع لتقديم معلومات محايدة، وموثوقة، وحديثة لزائريه في كل ما يخص صناعة الأسمنت
          </p>
          <h2 className="text-4xl md:text-4xl  mb-14 ">رسالة</h2>
          <p className="text-[#292E2B] opacity-50 text-2xl  leading-16 mb-20">
            يسعى موقع أسمنت مصر لكي يصبح الموقع الرائد في خدمة ودعم صناعة الأسمنت في الشرق الأوسط وشمال أفريقيا. وللوصول
            إلى ذلك، يجاهد الموقع لتقديم معلومات محايدة، وموثوقة، وحديثة لزائريه في كل ما يخص صناعة الأسمنت
          </p>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="bg-[#D5BCA230] rounded-full  md:me-auto mx-auto max-w-[700px] translate-x-2">
            <img
              src={"/images/Community/Ellipse.png"}
              className="object-contain ] relative translate-y-6 -translate-x-2"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
