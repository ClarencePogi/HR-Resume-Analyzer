import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hash_password(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export function getError(state: any, field: string) {
  const errs = state?.errors as any;
  
  if (!errs) return undefined;
  if (errs.general) return Array.isArray(errs.general) ? errs.general.join(" ") : String(errs.general);
  const v = errs[field];
  return Array.isArray(v) ? v.join(" ") : v;
};