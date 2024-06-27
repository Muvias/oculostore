'use client'

import { useParams, useRouter } from "next/navigation"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { Heading } from "../../settings/_components/Heading"
import { SizeColumn, columns } from "./Columns"

interface SizeClientProps {
    sizes: SizeColumn[]
}

export function SizeClient({ sizes }: SizeClientProps) {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Tamanhos (${sizes.length})`}
                    description="Gerencie os tamanhos da sua loja"
                />

                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <PlusIcon className="size-4 mr-2" />
                    Adc novo
                </Button>
            </div>

            <Separator />

            <DataTable
                columns={columns}
                data={sizes}
                searchKey="name"
            />

            <Heading title="API" description="Chamadas API para Tamanhos" />

            <Separator />

            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    )
}
