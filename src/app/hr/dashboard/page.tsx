import AppLayout from "@/layouts/AppLayout";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  return (
    <AppLayout>
        <div>
            <h1>Dashboard</h1>
        </div>
    </AppLayout>
  )
}