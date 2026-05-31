import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function LandingFeatureCard({ title, description, icon }: Readonly<{ title: string; description: string; icon: string }>) {
    return (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-500 transition-all duration-300">
            <CardContent>
                <div className="flex gap-5">
                    <div className="flex items-center flex-none p-2 rounded-lg bg-slate-700/50">
                        <Image src={icon} alt="Feature icon" width={50} height={50}/>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                        <p className="text-slate-400">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}