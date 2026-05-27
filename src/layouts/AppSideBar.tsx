import * as React from "react"

import { SearchForm } from "./SearchForm"
import {
	Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
	SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
	SidebarMenuItem, SidebarRail
} from "@/components/ui/sidebar"
import { UserButton } from '@clerk/nextjs'

import Link from "next/link"
import SideBarLogo from "@/components/SideBarLogo";

// This is sample data.
const navMain = [
	{
		title: "Admin Tools",
		url: "#",
		items: [
			{
				title: "Manage Users",
				url: "/admin/manage-users",
			},
			{
				title: "Manage Roles",
				url: "/admin/manage-roles",
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
			},
			{
				title: "Resumes",
				url: "/hr/resumes",
				isActive: true,
			},
			{
				title: "Candidates",
				url: "/hr/candidates",
			},
			{
				title: "AI Assistant",
				url: "/hr/ai-assistant",
			},
			{
				title: "Compare",
				url: "/hr/compare",
			}
		],
	}
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SideBarLogo/>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel className="font-extrabold">{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={item.isActive}>
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
	)
}
