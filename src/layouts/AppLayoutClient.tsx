import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import React from "react"

import AppThemeToggle from "./AppThemeToggle";
import UserDropdown from "./UserDropdown";
import { CurrentUser } from "@/lib/CurrentUser";
import { BreadCrumb } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default async function AppLayoutClient({ children, breadcrumb }: { children: React.ReactNode, breadcrumb?: BreadCrumb[] | null }) {
    const currentUser = await new CurrentUser().init();
    const user = currentUser.getUser();
    return (
        <>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                <div className="flex h-16 shrink-0 items-center justify-between">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumb?.map((item, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex items-center gap-2">
                    <AppThemeToggle/>
                    <UserDropdown user={user}/>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                {children}
            </div>
        </>
    )
}