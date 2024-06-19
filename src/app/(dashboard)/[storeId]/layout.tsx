import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Navbar } from "../_components/Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode
    params: {
        storeId: string
    }
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
    const { userId } = auth();

    if (!userId) redirect("/");

    const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId }
    })

    if (!store) redirect("/");

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}