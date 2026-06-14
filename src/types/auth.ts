export type CurrentUser = {
    id: number;
    name: string;
    email: string;
    fullySetup: boolean;
    roles: string[];
    permissions: string[];
};