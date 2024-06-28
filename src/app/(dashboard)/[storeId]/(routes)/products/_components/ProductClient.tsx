'use client'

import { useParams, useRouter } from "next/navigation"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { Heading } from "../../settings/_components/Heading"
import { ProductColumn, columns } from "./Columns"

interface ProductClientProps {
    products: ProductColumn[]
}

export function ProductClient({ products }: ProductClientProps) {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Produtos (${products.length})`}
                    description="Gerencie os produtos da sua loja"
                />

                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <PlusIcon className="size-4 mr-2" />
                    Adc novo
                </Button>
            </div>

            <Separator />

            <DataTable
                columns={columns}
                data={products}
                searchKey="name"
            />

            <Heading title="API" description="Chamadas API para Produtos" />

            <Separator />

            <ApiList entityName="products" entityIdName="productId" />
        </>
    )
}
