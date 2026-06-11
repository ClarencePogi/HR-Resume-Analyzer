import "server-only";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/sessionCookies";
import { CurrentUser } from "@/types/auth";

export async function getCurrentUser(): Promise<CurrentUser | null> {
    const session = await getSession();
    if (!session?.userId) return null;

    const user = await prisma.user.findUnique({
        where: { id: Number(session.userId) },
        include: {
            userRoles: {
                include: {
                    role: {
                        include: {
                            rolePermissions: {
                                include: {
                                    permission: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!user) return null;

    const roles = user.userRoles.map(ur => ur.role.name);
    const permissions = user.userRoles.flatMap(ur =>
        ur.role.rolePermissions.map(rp => rp.permission.name)
    );

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
        permissions: [...new Set(permissions)]
    };
}