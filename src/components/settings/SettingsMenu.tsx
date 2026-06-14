// components/settings/SettingsMenu.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menu = [
    { title: 'Profile', href: '/settings/profile' },
    { title: 'Appearance', href: '/settings/appearance' },
    { title: 'Notifications', href: '/settings/notification' },
    { title: 'Security', href: '/settings/security' },
    { title: 'Billing', href: '/settings/billing' },
]

export default function SettingsMenu() {
    const pathname = usePathname()

    return (
        <ul className="flex gap-1 border-b border-border">
            {menu.map((item, index) => {
                const isActive = pathname === item.href
                return (
                    <li key={index}>
                        <Link
                            href={item.href}
                            className={`inline-block px-4 py-2 text-sm font-medium transition-colors
                                ${isActive
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {item.title}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}