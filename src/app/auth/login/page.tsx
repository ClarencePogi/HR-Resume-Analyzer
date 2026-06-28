"use client";

import { useActionState, useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input"
import { login } from "./actions";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [ state, loginAction ] = useActionState(login, undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
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
            <div className="pointer-events-none fixed top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none fixed bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-md shadow-2xl shadow-black/40 px-8 py-10">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/30 mb-4">
                            <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Welcome back</h1>
                        <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
                    </div>

                    {/* Error banner */}
                    {state?.errors && (
                        <div className="mb-4 flex items-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3">
                            <svg className="w-4 h-4 flex-none text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>

                            { state?.errors.email && <p className="text-xs text-rose-400">{state?.errors.email}</p> }
                            { state?.errors.password && <p className="text-xs text-rose-400">{state?.errors.password}</p> }
                        </div>
                    )}

                    {/* Form */}
                    <form action={loginAction} className="flex flex-col gap-4">

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
                                required
                                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex justify-between">
                             {/* Remember me */}
                            <label className="flex items-center gap-3 cursor-pointer mt-1">
                                <input type="checkbox" className="accent-sky-500 w-4 h-4 flex-none" />
                                <span className="text-sm text-slate-400">Remember me for 30 days</span>
                            </label>
                            
                            <Link
                                href="/forgot-password"
                                className="text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2 transition"
                            >
                                Forgot password?
                            </Link>
                        </div>
                       

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 active:scale-[0.98]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                                    </svg>
                                    Logging in…
                                </span>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-700" />
                        <span className="text-xs text-slate-500">or continue with</span>
                        <div className="flex-1 h-px bg-slate-700" />
                    </div>

                    {/* OAuth buttons */}
                    <div className="flex gap-3">
                        <Link
                            href="/api/auth/google"
                            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 hover:bg-slate-700/50 px-4 py-2.5 text-sm text-slate-300 transition hover:border-slate-500"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Google
                        </Link>
                        {/* <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 hover:bg-slate-700/50 px-4 py-2.5 text-sm text-slate-300 transition hover:border-slate-500">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </button> */}
                    </div>

                    {/* Sign up link */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link href="/auth/sign-up" className="text-sky-400 hover:text-sky-300 font-medium underline underline-offset-2 transition">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
