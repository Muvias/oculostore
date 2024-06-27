import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { SizeClient } from "./_components/SizeClient";
import { SizeColumn } from "./_components/Columns";

export default async function SizesPage({ params }: { params: { sizeId: string } }) {
    const sizes = await prismadb.size.findMany({
        where: { storeId: params.sizeId },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "dd MMMM, yyyy", { locale: ptBR })
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient sizes={formattedSizes} />
            </div>
        </div>
    )
}
