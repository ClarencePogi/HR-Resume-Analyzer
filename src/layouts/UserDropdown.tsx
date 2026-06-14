'use client'

import { logout } from "@/app/auth/login/actions";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CurrentUser } from "@/types/auth";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function UserDropdown({user} : {user: CurrentUser | null}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{user?.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem className="flex justify-center gap-2">
                        <Settings/>
                        <Link href="/settings" className="cursor-poiter">
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex justify-center gap-2">
                        <LogOut/>
                        <label onClick={() => logout()} className="cursor-pointer">Logout</label>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}