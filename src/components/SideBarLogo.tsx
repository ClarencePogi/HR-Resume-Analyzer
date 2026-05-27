import Image from "next/image";

export default function SideBarLogo() {
    return (
        <div className="bg-[#111111] relative flex items-center justify-center gap-3 w-full h-15 rounded-xl">
            <Image
                src="/logo/Logo.png"
                alt="TalentScan Logo"
                height={60}
                width={50}
                priority
                className="object-contain"
            />
            <h1 className="text-white font-mono">TalentScan</h1>
        </div>
    );
}