import Link from "next/link";

export default function LandingMenu() {
    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <div className="flex items-center gap-10">
            {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="text-md font-semibold hover:text-blue-500"
                >
                    {item.name}
                </Link>
            ))}
        </div>
    )
}