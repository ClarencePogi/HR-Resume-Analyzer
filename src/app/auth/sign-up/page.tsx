"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signup } from "./action";
import { getError } from "@/lib/utils";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, SignupAction] = useActionState(signup, undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });

  };


  return (
    <main className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center px-4">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none fixed top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-md shadow-2xl shadow-black/40 px-8 py-10">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/30 mb-4">
              <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Create your account</h1>
            <p className="mt-1 text-sm text-slate-400">Get started — it's free</p>
          </div>

          {/* Form */}
          <form action={SignupAction} className="flex flex-col gap-4">

            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Full name</label>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition"
              />
              { getError(state, "name") && <p className="text-xs text-rose-400">{getError(state, "name")}</p> }
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Email</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition"
              />
              { getError(state, "email") && <p className="text-xs text-rose-400">{getError(state, "email")}</p> }
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              { getError(state, "password") && <p className="text-xs text-rose-400">{getError(state, "password")}</p> }
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Confirm password</label>
              <input
                name="confirm"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition"
              />
              {form.confirm && form.password !== form.confirm && (
                <p className="text-xs text-rose-400 mt-0.5">Passwords don't match</p>
              )}
              { (getError(state, "confirm") && !form.confirm) && <p className="text-xs text-rose-400">{getError(state, "confirm")}</p> }
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group mt-1">
              <input 
                name="terms" 
                checked={form.terms}
                onChange={handleChange}
                type="checkbox" 
                className={`mt-0.5 accent-sky-500 w-4 h-4 flex-none ${getError(state, "terms") ? 'animate-wiggle' : ''}`} />
              <input type="hidden" name="terms" value={form.terms ? "on" : "off"} />
              <span className="text-xs text-slate-400 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">Privacy Policy</Link>
              </span>
            </label>
            {getError(state, "terms") && (<span className="text-rose-400 text-xs mt-1">{getError(state, "terms")}</span>)}
            {/* Submit */}
            <button
              type="submit"
              disabled={loading || (!!form.confirm && form.password !== form.confirm)}
              className="mt-2 w-full rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-sky-400 hover:text-sky-300 font-medium underline underline-offset-2 transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
