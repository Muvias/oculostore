import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./MainNav";
import { StoreSwitcher } from "./StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export async function Navbar() {
    const { userId } = auth()

    if (!userId) redirect("/");

    const stores = await prismadb.store.findMany({
        where: { userId }
    })

    return (
        <div className="border-b">
            <div className="flex items-center h-16 px-4">
                <StoreSwitcher items={stores} />

                <MainNav className="mx-6" />

                <div className="flex items-center ml-auto space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}
