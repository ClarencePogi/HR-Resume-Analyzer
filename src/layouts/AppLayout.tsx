import { AppSidebar } from "./AppSideBar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react"
import AppLayoutClient from "./AppLayoutClient" 
import { BreadCrumb } from "@/types"

export default function AppLayout({ children, breadcrumb }: { children: React.ReactNode, breadcrumb?: BreadCrumb[] | null }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppLayoutClient breadcrumb={breadcrumb}>
                    {children}
                </AppLayoutClient>
            </SidebarInset>
        </SidebarProvider>
    )
}