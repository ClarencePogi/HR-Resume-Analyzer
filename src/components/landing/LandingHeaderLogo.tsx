import Image from "next/image";

export default function LandingHeaderLogo() {
    return (
        <div className="bg-[#111111] flex items-center gap-2 px-4 rounded-lg">
            <Image
                src="/logo/Logo.png"
                alt="TalentScan Logo"
                height={60}
                width={50}
                priority
                className="object-contain"
            />
            <span className="text-md font-bold text-white font-mono">TalentScan</span>
        </div>
    )
}