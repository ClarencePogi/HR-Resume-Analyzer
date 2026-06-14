import "server-only";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/lib/session";

export async function createSession(userId: string, is_setup: boolean) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt, is_setup });

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt
    });
}

export async function deleteSession() {
    (await cookies()).delete("session");
}

export async function getSession() {
    const cookie = (await cookies()).get("session")?.value;
    return await decrypt(cookie);
}