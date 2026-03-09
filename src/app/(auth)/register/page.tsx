"use client";

import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { isValidPhone, isValidEmail, isNonEmpty } from "@/lib/validation";

// ── API error shape (either form is possible) ─────────────────────────────────
interface ApiError {
  propertyMessage?: string;
  errorMessage?: string;
  code?: string;
  description?: string;
}

/** Extract a human-readable message from any error shape */
function extractMessage(err: ApiError): string {
  return err.errorMessage || err.description || err.code || "Unknown error";
}

export default function Page() {
  const { t, language } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();

  // ── Field state ────────────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ── Independent show/hide per password field ───────────────────────────────
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // ── Per-field validation errors ────────────────────────────────────────────
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const setFieldError = (field: string, msg: string) => setFieldErrors((prev) => ({ ...prev, [field]: msg }));
  const clearFieldError = (field: string) =>
    setFieldErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });

  const validateField = (field: string, value: string) => {
    if (field === "name" && !isNonEmpty(value)) {
      setFieldError("name", t("register.name_required") || "الاسم مطلوب");
    } else if (field === "phoneNumber") {
      if (!isNonEmpty(value)) setFieldError("phoneNumber", t("register.phone_required") || "رقم الهاتف مطلوب");
      else if (!isValidPhone(value)) setFieldError("phoneNumber", t("register.phone_invalid") || "رقم الهاتف غير صحيح");
      else clearFieldError("phoneNumber");
    } else if (field === "email") {
      if (!isNonEmpty(value)) setFieldError("email", t("common.email_required") || "البريد مطلوب");
      else if (!isValidEmail(value)) setFieldError("email", t("common.invalid_email") || "بريد إلكتروني غير صالح");
      else clearFieldError("email");
    } else {
      clearFieldError(field);
    }
  };

  // ── API validation errors ──────────────────────────────────────────────────
  const [apiErrors, setApiErrors] = useState<ApiError[]>([]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiErrors([]);

    // ── Client-side validation ────────────────────────────────────────────────
    const newErrors: Record<string, string> = {};
    if (!isNonEmpty(name)) newErrors.name = t("register.name_required") || "الاسم مطلوب";
    if (!isNonEmpty(phoneNumber)) newErrors.phoneNumber = t("register.phone_required") || "رقم الهاتف مطلوب";
    else if (!isValidPhone(phoneNumber))
      newErrors.phoneNumber = t("register.phone_invalid") || "رقم الهاتف غير صحيح (مثال: 01012345678)";
    if (!isNonEmpty(email)) newErrors.email = t("common.email_required") || "البريد مطلوب";
    else if (!isValidEmail(email)) newErrors.email = t("common.invalid_email") || "بريد إلكتروني غير صالح";
    if (password !== confirmPassword) newErrors.confirmPassword = t("register.password_mismatch");

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://cement.northeurope.cloudapp.azure.com:5000/api/Auth/Register", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify({ name, phoneNumber, email, password }),
      });

      const data = await res.json();

      if (res.ok && data?.isAuthenticated) {
        login(data);
        toast.success(t("register.success"));
        router.push("/");
      } else {
        // Parse errors array from the response body
        const errors: ApiError[] = Array.isArray(data?.errors) ? data.errors : [];
        if (errors.length > 0) {
          setApiErrors(errors);
        } else {
          toast.error(t("register.failed"));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(t("login.server_error"));
    } finally {
      setLoading(false);
    }
  };

  const isPasswordMismatch = !!confirmPassword && confirmPassword !== password;
  const isPasswordMatch = !!confirmPassword && confirmPassword === password;

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex flex-col justify-center items-start min-h-screen bg-gray-50 containerr !w-[80%]"
    >
      <h2 className="font-bold text-4xl text-center mb-4">{t("register.title")}</h2>

      <p className="text-center text-xl text-gray-500 mb-8">
        {t("register.have_account")}{" "}
        <Link href="/login" className="text-[#618FB5] underline">
          {t("register.login_now")}
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 self-stretch">
        {/* الاسم الكامل */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            {t("register.full_name")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            onBlur={(e) => validateField("name", e.target.value)}
            required
            placeholder={t("register.full_name_placeholder")}
            className={`w-full px-4 py-3 bg-[#E5FBFF] border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
              fieldErrors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {fieldErrors.name && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* رقم الهاتف */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            {t("jobs.phone")}
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              clearFieldError("phoneNumber");
            }}
            onBlur={(e) => validateField("phoneNumber", e.target.value)}
            required
            placeholder={t("register.phone_placeholder")}
            className={`w-full px-4 py-3 bg-[#E5FBFF] border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
              fieldErrors.phoneNumber ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {fieldErrors.phoneNumber && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {fieldErrors.phoneNumber}
            </p>
          )}
        </div>

        {/* البريد الإلكتروني */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            {t("login.email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            onBlur={(e) => validateField("email", e.target.value)}
            required
            placeholder={t("login.email_placeholder")}
            className={`w-full px-4 py-3 bg-[#E5FBFF] border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
              fieldErrors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* كلمة المرور */}
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
            className="absolute top-[38px] left-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {/* تأكيد كلمة المرور */}
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            {t("register.confirm_password")}
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder={t("register.confirm_password_placeholder")}
            className={`w-full px-4 py-3 bg-[#E5FBFF] border rounded-lg focus:ring-2 focus:outline-none pr-10 transition-colors ${
              isPasswordMismatch
                ? "border-red-400 focus:ring-red-300"
                : isPasswordMatch
                  ? "border-green-400 focus:ring-green-300"
                  : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute top-[38px] left-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>

          {/* Live mismatch hint */}
          {isPasswordMismatch && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {t("register.password_mismatch")}
            </p>
          )}
          {isPasswordMatch && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} />
              {t("register.passwords_match") || (language === "ar" ? "كلمتا المرور متطابقتان" : "Passwords match")}
            </p>
          )}
        </div>

        {/* ── API Validation Errors ─────────────────────────────────────────── */}
        {apiErrors.length > 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 space-y-2">
            <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
              <AlertCircle size={15} />
              {t("register.validation_errors") ||
                (language === "ar" ? "يرجى تصحيح الأخطاء التالية:" : "Please fix the following errors:")}
            </p>
            <ul className="space-y-1">
              {apiErrors.map((err, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-600">
                  <span className="mt-0.5 shrink-0">•</span>
                  <span>
                    {err.propertyMessage && <span className="font-semibold">{err.propertyMessage}: </span>}
                    {extractMessage(err)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || isPasswordMismatch}
          className="w-full bg-[#618FB5] hover:bg-[#507aa0] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg mt-6 text-lg font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          {loading && <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          {loading ? t("register.loading") : t("register.submit")}
        </button>
      </form>
    </div>
  );
}
