"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLanguage } from "@/contexts/LanguageContext";

export const Form = () => {
  const { t } = useLanguage();

  type FormValues = {
    name: string;
    email: string;
    cv: File | null;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      cv: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("common.name_required")),
      email: Yup.string().email(t("common.invalid_email")).required(t("common.email_required")),
      cv: Yup.mixed().required(t("common.cv_required")),
    }),
    onSubmit: (values) => {
      //   console.log("Form Submitted ✅", values);
    },
  });

  return (
    <>
      <h2 className="text-center font-semibold text-2xl mb-4">{t("common.register_now")}</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-1" htmlFor="name">
            {t("common.name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="border border-gray-300 py-4 mt-2 rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#007b9e]"
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-sm">{formik.errors.name}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-1" htmlFor="email">
            {t("common.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border border-gray-300 py-4 mt-2 rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#007b9e]"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-1" htmlFor="cv">
            {t("common.attach_cv")}
          </label>

          <input
            id="cv"
            name="cv"
            type="file"
            onChange={(event) => formik.setFieldValue("cv", event.currentTarget.files?.[0] || null)}
            className="hidden"
          />

          <label
            htmlFor="cv"
            className="w-full h-40 border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:border-[#007b9e] hover:text-[#007b9e] transition-colors"
          >
            <span className="text-5xl font-bold mb-2">+</span>
            <span className="text-sm">{formik.values.cv ? formik.values.cv.name : t("common.attach_cv_pdf")}</span>
          </label>

          {formik.touched.cv && formik.errors.cv && (
            <span className="text-red-500 text-sm mt-1">{formik.errors.cv as string}</span>
          )}
        </div>

        <button
          type="submit"
          className=" mx-auto block w-fit px-16  bg-[#A6C7E0]  py-2 rounded-lg text-lg font-semibold hover:bg-[#005f7a] transition-all"
        >
          {t("common.register")}
        </button>
      </form>
    </>
  );
};
