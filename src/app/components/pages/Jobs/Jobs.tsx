"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";

interface yearsOfExperienceResponse {
  yearsOfExperienceLookups: { name: string; id: string }[];
}
interface SpecializationResponse {
  specializationLookups: { name: string; id: string }[];
}
interface jobResponse {
  jobLookups: { name: string; id: string }[];
}

export const Jobs = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"individual" | "company">("individual");
  const [loading, setLoading] = useState(true);
  const [specializations, setSpecializations] = useState<{ id: string; name: string }[]>([]);
  const [jobs, setJobs] = useState<{ id: string; name: string }[]>([]);
  const [yearsOfExperience, setYearsOfExperience] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchSpecializations() {
      try {
        const res = await fetchWithLanguage(
          "https://cement.northeurope.cloudapp.azure.com:5000/api/SpecializationLookup/GetAllSpecializationLookupsList",
          {
            headers: {
              accept: "text/plain",
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch specializations");

        const data: SpecializationResponse = await res.json();
        setSpecializations(data.specializationLookups || []);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    }

    async function fetchYearsOfExperience() {
      try {
        const res = await fetchWithLanguage(
          "https://cement.northeurope.cloudapp.azure.com:5000/api/YearsOfExperienceLookup/GetAllYearsOfExperienceLookupsList",
          {
            headers: {
              accept: "text/plain",
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch years of experience");

        const data: yearsOfExperienceResponse = await res.json();
        setYearsOfExperience(data.yearsOfExperienceLookups || []);
      } catch (error) {
        console.error("Error fetching years of experience:", error);
      }
    }

    async function fetchJobs() {
      try {
        const res = await fetchWithLanguage(
          "https://cement.northeurope.cloudapp.azure.com:5000/api/JobLookup/GetAllJobLookupsList",
          {
            headers: {
              accept: "text/plain",
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data: jobResponse = await res.json();
        setJobs(data.jobLookups || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchSpecializations(), fetchYearsOfExperience(), fetchJobs()]);
      setLoading(false);
    };

    loadAll();
  }, [language]);

  const formikIndividual = useFormik({
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
      firstName: Yup.string().required(t("jobs.required")),
      lastName: Yup.string().required(t("jobs.required")),
      phone: Yup.string().required(t("jobs.required")),
      email: Yup.string().email("Invalid email").required(t("jobs.required")),
      specialization: Yup.string().required(t("jobs.required")),
      job: Yup.string().required(t("jobs.required")),
      experience: Yup.string().required(t("jobs.required")),
      cv: Yup.mixed().required(t("jobs.required")),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("FirstName", values.firstName);
        formData.append("LastName", values.lastName);
        formData.append("PhoneNumber", values.phone);
        formData.append("Email", values.email);
        formData.append("SpecializationId", values.specialization);
        formData.append("JobId", values.job);
        formData.append("YearsOfExperienceId", values.experience);
        formData.append("WorkLink", values.portfolio);
        if (values.cv) {
          formData.append("CvFile", values.cv);
        }

        const response = await fetchWithLanguage(
          "https://cement.northeurope.cloudapp.azure.com:5000/api/JobApplication/CreateJobApplication",
          {
            method: "POST",
            headers: {
              accept: "text/plain",
            },
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to send data");
        }

        toast.success(t("jobs.success"));
        formikIndividual.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(t("jobs.error"));
      }
    },
  });

  const formikCompany = useFormik({
    initialValues: {
      companyName: "",
      jobDetails: "",
      cv: null as File | null,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required(t("jobs.required")),
      jobDetails: Yup.string().required(t("jobs.required")),
      cv: Yup.mixed().required(t("jobs.required")),
    }),
    onSubmit: (values) => {
      console.log("Company Form submitted ✅", values);
      toast.success(t("jobs.success"));
    },
  });

  return (
    <div className="containerr py-10 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center pt-8">{t("jobs.title")}</h2>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab("individual")}
          className={`px-8 py-2 font-semibold transition-all ${
            activeTab === "individual" ? "text-[#51E482] border-b-2 border-[#51E482]" : "text-black"
          }`}
        >
          {t("jobs.search_job")}
        </button>
        <button
          onClick={() => setActiveTab("company")}
          className={`px-8 font-semibold transition-all ${
            activeTab === "company" ? "text-[#51E482] border-b-2 border-[#51E482]" : "text-black"
          }`}
        >
          {t("jobs.announce_job")}
        </button>
      </div>

      {activeTab === "individual" ? (
        <form onSubmit={formikIndividual.handleSubmit} className="grid grid-cols-1 md:grid-cols-9 gap-y-6 md:gap-x-6">
          <div className="flex flex-col md:col-span-4">
            <label htmlFor="firstName" className="font-medium">
              {t("jobs.first_name")}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.firstName}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            />
            {formikIndividual.touched.firstName && formikIndividual.errors.firstName && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.firstName}</span>
            )}
          </div>

          <div className="hidden md:block"></div>

          <div className="flex flex-col md:col-span-4">
            <label htmlFor="lastName" className="font-medium">
              {t("jobs.last_name")}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.lastName}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            />
            {formikIndividual.touched.lastName && formikIndividual.errors.lastName && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.lastName}</span>
            )}
          </div>

          <div className="flex flex-col md:col-span-4">
            <label htmlFor="phone" className="font-medium">
              {t("jobs.phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.phone}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            />
            {formikIndividual.touched.phone && formikIndividual.errors.phone && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.phone}</span>
            )}
          </div>

          <div className="hidden md:block"></div>

          <div className="flex flex-col md:col-span-4">
            <label htmlFor="email" className="font-medium">
              {t("jobs.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.email}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            />
            {formikIndividual.touched.email && formikIndividual.errors.email && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.email}</span>
            )}
          </div>

          <div className="flex flex-col md:col-span-4">
            <label htmlFor="specialization" className="font-medium">
              {t("jobs.specialization")}
            </label>
            <select
              id="specialization"
              name="specialization"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.specialization}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            >
              <option value="">{t("jobs.select_specialization")}</option>
              {specializations.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                  {specialization.name}
                </option>
              ))}
            </select>
            {formikIndividual.touched.specialization && formikIndividual.errors.specialization && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.specialization}</span>
            )}
          </div>

          <div className="hidden md:block"></div>

          <div className="flex flex-col md:col-span-4">
            <label htmlFor="job" className="font-medium">
              {t("jobs.job")}
            </label>
            <select
              id="job"
              name="job"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.job}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            >
              <option value="">{t("jobs.select_job")}</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
            {formikIndividual.touched.job && formikIndividual.errors.job && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.job}</span>
            )}
          </div>

          <div className="flex flex-col md:col-span-4">
            <label htmlFor="experience" className="font-medium">
              {t("jobs.experience")}
            </label>
            <select
              id="experience"
              name="experience"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.experience}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            >
              <option value="">{t("jobs.select_experience")}</option>
              {yearsOfExperience.map((experience) => (
                <option key={experience.id} value={experience.id}>
                  {experience.name}
                </option>
              ))}
            </select>
            {formikIndividual.touched.experience && formikIndividual.errors.experience && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.experience}</span>
            )}
          </div>

          <div className="hidden md:block"></div>

          <div className="flex flex-col md:col-span-4">
            <label htmlFor="portfolio" className="font-medium">
              {t("jobs.portfolio")}
            </label>
            <input
              id="portfolio"
              name="portfolio"
              type="text"
              onChange={formikIndividual.handleChange}
              onBlur={formikIndividual.handleBlur}
              value={formikIndividual.values.portfolio}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            />
          </div>

          <div className="flex flex-col md:col-span-9">
            <label className="text-lg font-semibold mb-2" htmlFor="cvIndividual">
              {t("jobs.attach_cv")}
            </label>

            <input
              id="cvIndividual"
              name="cv"
              type="file"
              accept="application/pdf"
              onChange={(e) => formikIndividual.setFieldValue("cv", e.currentTarget.files?.[0] || null)}
              className="hidden"
            />

            <label
              htmlFor="cvIndividual"
              className="w-full h-40 border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:border-[#007b9e] hover:text-[#007b9e] transition-colors"
            >
              <span className="text-5xl font-bold mb-2">+</span>
              <span className="text-sm">
                {formikIndividual.values.cv ? formikIndividual.values.cv.name : t("jobs.attach_cv_pdf")}
              </span>
            </label>

            {formikIndividual.touched.cv && formikIndividual.errors.cv && (
              <span className="text-red-500 text-sm mt-1">{formikIndividual.errors.cv as string}</span>
            )}
          </div>

          <div className="col-span-9 flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#007b9e] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#006b8a] transition-colors"
            >
              {t("common.submit")}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={formikCompany.handleSubmit} className="flex flex-col gap-y-6">
          <div className="flex flex-col">
            <label htmlFor="companyName" className="font-medium">
              {t("jobs.company_name")}
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              onChange={formikCompany.handleChange}
              onBlur={formikCompany.handleBlur}
              value={formikCompany.values.companyName}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2"
            />
            {formikCompany.touched.companyName && formikCompany.errors.companyName && (
              <span className="text-red-500 text-sm mt-1">{formikCompany.errors.companyName}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="jobDetails" className="font-medium">
              {t("jobs.job_details")}
            </label>
            <textarea
              id="jobDetails"
              name="jobDetails"
              rows={5}
              onChange={formikCompany.handleChange}
              onBlur={formikCompany.handleBlur}
              value={formikCompany.values.jobDetails}
              className="bg-[#ECF5F9] border border-[#618FB5] py-2 px-4 rounded-md mt-2 resize-none"
            />
            {formikCompany.touched.jobDetails && formikCompany.errors.jobDetails && (
              <span className="text-red-500 text-sm mt-1">{formikCompany.errors.jobDetails}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2" htmlFor="cvCompany">
              {t("jobs.attach_cv")}
            </label>

            <input
              id="cvCompany"
              name="cv"
              accept="application/pdf"
              type="file"
              onChange={(e) => formikCompany.setFieldValue("cv", e.currentTarget.files?.[0] || null)}
              className="hidden"
            />

            <label
              htmlFor="cvCompany"
              className="w-full h-40 border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:border-[#007b9e] hover:text-[#007b9e] transition-colors"
            >
              <span className="text-5xl font-bold mb-2">+</span>
              <span className="text-sm">
                {formikCompany.values.cv ? formikCompany.values.cv.name : t("jobs.attach_details_pdf")}
              </span>
            </label>

            {formikCompany.touched.cv && formikCompany.errors.cv && (
              <span className="text-red-500 text-sm mt-1">{formikCompany.errors.cv as string}</span>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#007b9e] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#006b8a] transition-colors"
            >
              {t("common.submit")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
