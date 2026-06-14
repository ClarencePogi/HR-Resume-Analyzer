import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SettingsMenu from "@/components/settings/SettingsMenu";


export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your account preferences, profile information, and application settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <SettingsMenu/>
                        <main className="p-4">
                            {children}
                        </main>
                    </div>
                </CardContent>
            </Card>
          
        </AppLayout>
    );
}