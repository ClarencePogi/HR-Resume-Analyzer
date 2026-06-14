import * as React from "react"
import { SearchForm } from "./SearchForm"
import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarRail
} from "@/components/ui/sidebar"
import Link from "next/link"
import SideBarLogo from "@/components/SideBarLogo"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { MenuGroup } from "@/types"

const navMain: MenuGroup[] = [
    {
        title: "Admin Tools",
        url: "#",
        items: [
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                permission: "view:manage-users",
            },
            {
                title: "Manage Roles",
                url: "/admin/manage-roles",
                permission: "view:manage-roles",
            },
        ],
    },
    {
        title: "HR Tools",
        url: "#",
        items: [
            {
                title: "Dashboard",
                url: "/hr/dashboard",
                permission: "view:dashboard",
            },
            {
                title: "Resumes",
                url: "/hr/resumes",
                permission: "view:resumes",
            },
            {
                title: "Candidates",
                url: "/hr/candidates",
                permission: "view:candidates",
            },
            {
                title: "AI Assistant",
                url: "/hr/ai-assistant",
                permission: "view:ai-assistant",
            },
            {
                title: "Compare",
                url: "/hr/compare",
                permission: "view:compare",
            },
        ],
    },
    {
        title: "My Account",
        url: "#",
        items: [
            {
                title: "My Profile",
                url: "/applicant/profile",
                permission: "view:profile",
            },
        ],
    },
];

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const currentUser = await getCurrentUser();
    const userPermissions = currentUser?.permissions ?? [];

    // Filter out items the user doesn't have permission for
    // and filter out empty groups
    const filteredNav = navMain
        .map(group => ({
            ...group,
            items: group.items.filter(item => userPermissions.includes(item.permission))
        }))
        .filter(group => group.items.length > 0);

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SideBarLogo />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                {filteredNav.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="font-extrabold">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={false}>
                                            <Link href={item.url} className="font-semibold">
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}