import { AppSidebar } from "./AppSideBar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react"
import AppLayoutClient from "./AppLayoutClient" 

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppLayoutClient>
                    {children}
                </AppLayoutClient>
            </SidebarInset>
        </SidebarProvider>
    )
}