"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Jobs = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      specialization: "",
      job: "",
      experience: "",
      portfolio: "",
      cv: null as File | null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("الاسم الأول مطلوب"),
      lastName: Yup.string().required("الاسم الأخير مطلوب"),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
      email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
      specialization: Yup.string().required("التخصص مطلوب"),
      job: Yup.string().required("الوظيفة مطلوبة"),
      experience: Yup.string().required("عدد سنين الخبرة مطلوب"),
      cv: Yup.mixed().required("السيرة الذاتية مطلوبة"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted ✅", values);
      alert("تم إرسال البيانات بنجاح!");
    },
  });

  return (
    <div className="containerr py-10 px-4" dir="rtl">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center pt-8">وظائف أسمنت مصر</h2>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-9 gap-y-6 md:gap-x-6">
        <div className="flex flex-col md:col-span-4">
          <label htmlFor="firstName" className="font-medium">
            الاسم الأول
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.firstName}</span>
          )}
        </div>

        <div className="hidden md:block"></div>

        <div className="flex flex-col md:col-span-4">
          <label htmlFor="lastName" className="font-medium">
            الاسم الأخير
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.lastName}</span>
          )}
        </div>

        <div className="flex flex-col md:col-span-4">
          <label htmlFor="phone" className="font-medium">
            رقم الهاتف
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          />
          {formik.touched.phone && formik.errors.phone && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.phone}</span>
          )}
        </div>

        <div className="hidden md:block"></div>

        <div className="flex flex-col md:col-span-4">
          <label htmlFor="email" className="font-medium">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.email}</span>
          )}
        </div>

        <div className="flex flex-col md:col-span-4">
          <label htmlFor="specialization" className="font-medium">
            التخصص
          </label>
          <select
            id="specialization"
            name="specialization"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialization}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          >
            <option value="">اختر التخصص</option>
            <option value="فني">فني</option>
            <option value="سائق">سائق</option>
            <option value="محاسب">محاسب</option>
          </select>
          {formik.touched.specialization && formik.errors.specialization && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.specialization}</span>
          )}
        </div>

        <div className="hidden md:block"></div>

        <div className="flex flex-col md:col-span-4">
          <label htmlFor="job" className="font-medium">
            الوظيفة
          </label>
          <select
            id="job"
            name="job"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.job}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          >
            <option value="">اختر الوظيفة</option>
            <option value="مهندس">مهندس</option>
            <option value="أخصائي">أخصائي</option>
            <option value="مشرف">مشرف</option>
          </select>
          {formik.touched.job && formik.errors.job && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.job}</span>
          )}
        </div>

        <div className="flex flex-col md:col-span-4">
          <label htmlFor="experience" className="font-medium">
            عدد سنين الخبرة
          </label>
          <select
            id="experience"
            name="experience"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.experience}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          >
            <option value="">اختر عدد السنوات</option>
            <option value="0-1">0 - 1</option>
            <option value="1-3">1 - 3</option>
            <option value="3-5">3 - 5</option>
            <option value="5+">+5 سنوات</option>
          </select>
          {formik.touched.experience && formik.errors.experience && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.experience}</span>
          )}
        </div>

        <div className="hidden md:block"></div>

        <div className="flex flex-col md:col-span-4">
          <label htmlFor="portfolio" className="font-medium">
            رابط الأعمال
          </label>
          <input
            id="portfolio"
            name="portfolio"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.portfolio}
            className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
          />
        </div>

        <div className="flex flex-col md:col-span-9">
          <label className="text-lg font-semibold mb-2" htmlFor="cv">
            إرفاق السيرة الذاتية
          </label>

          <input
            id="cv"
            name="cv"
            type="file"
            onChange={(e) => formik.setFieldValue("cv", e.currentTarget.files?.[0] || null)}
            className="hidden"
          />

          <label
            htmlFor="cv"
            className="w-full h-40 border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:border-[#007b9e] hover:text-[#007b9e] transition-colors"
          >
            <span className="text-5xl font-bold mb-2">+</span>
            <span className="text-sm">
              {formik.values.cv ? formik.values.cv.name : "إرفاق ملف السيرة الذاتية (PDF)"}
            </span>
          </label>

          {formik.touched.cv && formik.errors.cv && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.cv as string}</span>
          )}
        </div>

        <div className="col-span-9 flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#007b9e] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#006b8a] transition-colors"
          >
            إرسال
          </button>
        </div>
      </form>
    </div>
  );
};
