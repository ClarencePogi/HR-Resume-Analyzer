import LandingHeaderLogo from "./LandingHeaderLogo";
import LandingMenu from "./LandingMenu";

import { Button } from "@/components/ui/button"

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1">
            <header className="flex h-20 items-center justify-around gap-2 border-b px-20">
                <LandingHeaderLogo />
                <div className="flex flex-1 justify-end gap-6">
                    <LandingMenu/>
                    <div className="flex gap-3 px-4">
                        <Button variant="outline">Sign up</Button>
                        <Button>Login</Button>
                    </div>
                </div>
            </header>
            <div className="relative h-screen bg-gradient-to-r from-slate-900 to-slate-700">
                {children}
            </div>
        </div>
    )
}