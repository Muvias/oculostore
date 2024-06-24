import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { BillboardClient } from "./_components/BillboardClient";
import { BillboardColumn } from "./_components/Columns";

export default async function BillboardsPage({ params }: { params: { storeId: string } }) {
    const billboards = await prismadb.billboard.findMany({
        where: { storeId: params.storeId },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "dd MMMM, yyyy", { locale: ptBR })
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient billboards={formattedBillboards} />
            </div>
        </div>
    )
}
