export type CurrentUser = {
    id: number;
    name: string;
    email: string;
    fullySetup: boolean;
    companyId?: number
    role: {
        id: number
        name: string
    };
    permissions: string[];
    company?: {
        name: string,
        email: string
    } 
};