"use client";

import React from "react";
import { Form } from "./Form";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export const Academy = () => {
  return (
    <section dir="rtl" className="bg-white py-10 containerr">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
        <div className="md:w-1/2  text-center md:text-right space-y-4">
          <h2 className=" font-bold ">
            <span className="text-7xl font-bold">أكاديمية</span> <br />
            <span className="text-5xl leading-24 font-bold">أسمنت مصر</span>
          </h2>
          <p className="text-[#292E2B] opacity-50 text-xl  ps-14 font-semibold">
            قم بالتسجيل الان في التدريبات الصيفيه للحصول علي خبرات جديده في هذا المجال إنضم لنا الان!
          </p>
          <div className="flex gap-2 py-5 items-center">
            <Mail className="!text-[#A6C7E0]" />
            <p className="text-[#292E2B] opacity-50 text-2xl">Cementmasr@gmail.com</p>
          </div>
          <div className="flex gap-2 py-5 items-center">
            <Phone fill="#A6C7E0" className="text-[#A6C7E0]" />
            <p className="text-[#292E2B] opacity-50 text-2xl">+20 01120030082</p>
          </div>
          <button className="flex items-center gap-3 bg-[#A6C7E0] px-14 py-4 w-fit mt-4 rounded-xl">
            {" "}
            إنضم لنا الان
            <ArrowLeft />
          </button>
        </div>

        <div className="md:w-1/2 w-full  bg-secoundry rounded-2xl p-6 shadow-lg">
          <Form />
        </div>
      </div>
    </section>
  );
};
