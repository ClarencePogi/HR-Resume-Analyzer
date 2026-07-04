export type MenuItem = {
    title: string;
    url: string;
    permission: string;
    isActive?: boolean;
};

export type MenuGroup = {
    title: string;
    url: string;
    items: MenuItem[];
};

export type BreadCrumb = {
    title: string
    href: string
};

export interface Company {
    id: number
    name: string
    email: string
}

export interface Permission {
    id: number
    name: string
    description: string
    created_at: Date
}

export interface Role {
    id: number
    name: string
    description: string
    created_at: Date
    permissions: Permission[]
}
export interface User {
    id: number
    name: string
    email: string
    fullySetup: boolean
    created_at: Date
    updated_at: Date
    company?: Company
    roles?: Role[]
}