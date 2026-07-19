"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchWithLanguage(
        "https://cement.northeurope.cloudapp.azure.com:5000/api/Auth/customer-login",
        {
          method: "POST",
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json-patch+json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (res.ok && data?.isAuthenticated) {
        login(data);
        toast.success(t("login.success"));
        router.push("/");
      } else {
        toast.error(t("login.failed"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("login.server_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex flex-col justify-center items-start min-h-screen bg-gray-50 containerr !w-[80%]"
    >
      <h2 className="font-bold text-4xl text-center mb-4">{t("login.title")}</h2>

      <p className="text-center text-xl text-gray-500 mb-8">
        {t("login.no_account")}{" "}
        <Link href="/register" className="text-[#618FB5] underline">
          {t("login.register_now")}
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 self-stretch ">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            {t("login.email")}
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t("login.email_placeholder")}
            className="w-full px-4 py-3 bg-[#E5FBFF] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            {t("login.password")}
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t("login.password_placeholder")}
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
            <span>{t("login.remember_me")}</span>
          </label>
          <Link href="#" className="text-[#618FB5] underline">
            {t("login.forgot_password")}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#618FB5] hover:bg-[#618FB5dd] disabled:opacity-70 text-white py-3 rounded-lg mt-6 text-lg font-semibold transition-all duration-200"
        >
          {loading ? t("login.loading") : t("login.submit")}
        </button>
      </form>
    </div>
  );
}
