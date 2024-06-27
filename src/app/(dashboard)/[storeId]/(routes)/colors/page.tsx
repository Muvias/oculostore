import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ColorClient } from "./_components/ColorClient";
import { ColorColumn } from "./_components/Columns";

export default async function ColorPage({ params }: { params: { colorId: string } }) {
    const colors = await prismadb.color.findMany({
        where: { storeId: params.colorId },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "dd MMMM, yyyy", { locale: ptBR })
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient colors={formattedColors} />
            </div>
        </div>
    )
}
