import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./_components/SettingsForm";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
    const { userId } = auth();

    if (!userId) redirect("/");

    const store = await prismadb.store.findUnique({
        where: { id: params.storeId, userId }
    })

    if (!store) redirect("/");

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}
