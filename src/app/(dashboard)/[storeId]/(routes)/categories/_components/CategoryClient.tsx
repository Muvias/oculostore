'use client'

import { useParams, useRouter } from "next/navigation"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { Heading } from "../../settings/_components/Heading"
import { CategoryColumn, columns } from "./Columns"

interface CategoryClientProps {
    categories: CategoryColumn[]
}

export function CategoryClient({ categories }: CategoryClientProps) {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categorias (${categories.length})`}
                    description="Gerencie as categorias da sua loja"
                />

                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <PlusIcon className="size-4 mr-2" />
                    Adc novo
                </Button>
            </div>

            <Separator />

            <DataTable
                columns={columns}
                data={categories}
                searchKey="name"
            />

            <Heading title="API" description="Chamadas API para Categorias" />

            <Separator />

            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    )
}
