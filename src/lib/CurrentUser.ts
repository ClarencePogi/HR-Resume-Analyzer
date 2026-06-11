import "server-only";

import { CurrentUser as User } from "@/types/auth"
import { getCurrentUser } from "./getCurrentUser";

export class CurrentUser {
    private user: User | null = null; 
    
    async init() {
        this.user = await getCurrentUser();
        return this;
    }

    getUser() {
        return this.user;
    }
}