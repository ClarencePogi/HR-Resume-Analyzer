
import ProfileForm from "@/components/settings/profile/ProfileForm";
import { CurrentUser } from "@/lib/CurrentUser";
import { CurrentUser as User } from '@/types/auth';
import { getRoles } from "@/lib/roles";
import { Role } from "@/types/roles";

export default async function Profile() {
    const currentUser = await new CurrentUser().init();
    
    const user: User = currentUser.getUser()!;
    const roles: Role[] = await getRoles();
    const filtered_roles = roles.filter(role => role.id !== 1 ); // Remove Superadmin role

    return (
        <div className="flex flex-col justify-center gap-6 w-full">
            {/* Header */}
            <div className="flex justify-between border-b border-border pb-4">
                <div className="flex flex-col gap-2">
                    <h2>Profile</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Update your personal and company information.
                    </p>    
                </div>
            </div>
            <ProfileForm currentUser={user} roles={filtered_roles}/>
        </div>
    );
}