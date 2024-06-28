import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ProductColumn } from "./_components/Columns";
import { ProductClient } from "./_components/ProductClient";
import { priceFormatter } from "@/lib/utils";

export default async function ProductsPage({ params }: { params: { storeId: string } }) {
    const products = await prismadb.product.findMany({
        where: { storeId: params.storeId },
        include: {
            category: true,
            size: true,
            color: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: priceFormatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        createdAt: format(item.createdAt, "dd MMMM, yyyy", { locale: ptBR })
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient products={formattedProducts} />
            </div>
        </div>
    )
}
