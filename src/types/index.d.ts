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