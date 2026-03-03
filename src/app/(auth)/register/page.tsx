"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div dir="rtl" className="flex flex-col justify-center items-start min-h-screen bg-gray-50 containerr !w-[80%]">
      <h2 className="font-bold text-4xl text-center mb-4">تسجيل جديد </h2>

      <p className="text-center text-xl text-gray-500 mb-8">
        يوجد لديك حساب
        <Link href="/login" className="text-[#618FB5] underline">
          {" "}
          تسجيل الدخول؟
        </Link>
      </p>

      <form className="space-y-6 self-stretch ps-14">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            الاسم الكامل
          </label>
          <input
            id="fullName"
            type="text"
            className="w-full px-4 py-3 bg-[#E5FBFF] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            رقم الهاتف
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full px-4 py-3 bg-[#E5FBFF] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-3 bg-[#E5FBFF] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            الرقم السري
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-3 bg-[#E5FBFF] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[38px] left-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            تأكيد الرقم السري
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-3 bg-[#E5FBFF] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[38px] left-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#618FB5] hover:bg-[#618FB5dd] text-white py-3 rounded-lg mt-6 text-lg font-semibold transition-all duration-200"
        >
          تسجيل جديد
        </button>
      </form>
    </div>
  );
}
