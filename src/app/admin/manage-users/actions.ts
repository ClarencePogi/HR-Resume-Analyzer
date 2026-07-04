'use server';

import { prisma } from "@/lib/prisma";
import { User } from "@/types";
import { rm } from "fs";

export async function get_users() : Promise<User[]> {
    const users = await prisma.user.findMany({
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
            },
            company: true
        }
    });

    return users.map(u => {
        const { userRoles, createdAt, updatedAt, ...rest } = u;
        console.log(rest);
        return {
            ...rest,
            created_at: createdAt,
            updated_at: updatedAt,
            company: u.company ?? undefined,
            roles: userRoles.map(({ role }) => ({
                id: role.id,
                name: role.name,
                description: role.description ?? "",
                created_at: role.createdAt,
                permissions: role.rolePermissions.map(({ permission }) => ({
                    id: permission.id,
                    name: permission.name,
                    description: permission.description ?? "",
                    created_at: permission.createdAt,
                }))
            }))
        };
    });
}