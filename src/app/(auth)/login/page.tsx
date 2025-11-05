"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://48.221.114.44/api/Auth/Login", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.text();

      if (res.ok) {
        toast.success(" تم تسجيل الدخول بنجاح!");
        router.push("/");
        // console.log("Login success:", data);
      } else {
        toast.error(" فشل تسجيل الدخول، تأكد من البريد الإلكتروني أو كلمة المرور.");
        // console.error("Login failed:", data);
      }
    } catch (error) {
      console.error(error);
      toast.error(" حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="flex flex-col justify-center items-start min-h-screen bg-gray-50 containerr !w-[80%]">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="colored" />

      <h2 className="font-bold text-4xl text-center mb-4">تسجيل الدخول</h2>

      <p className="text-center text-xl text-gray-500 mb-8">
        لا يوجد لديك حساب؟{" "}
        <Link href="/register" className="text-[#618FB5] underline">
          تسجيل الآن
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 self-stretch ps-14">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="ادخل بريدك الإلكتروني"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="ادخل الرقم السري"
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

        <div className="flex justify-between items-center text-sm mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-[#618FB5] border-gray-300 rounded focus:ring-blue-400" />
            <span>تذكرني</span>
          </label>
          <Link href="#" className="text-[#618FB5] underline">
            نسيت كلمة السر؟
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#618FB5] hover:bg-[#618FB5dd] disabled:opacity-70 text-white py-3 rounded-lg mt-6 text-lg font-semibold transition-all duration-200"
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}
