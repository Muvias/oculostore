'use client'

import { useParams, useRouter } from "next/navigation"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { Heading } from "../../settings/_components/Heading"
import { ColorColumn, columns } from "./Columns"

interface ColorClientProps {
    colors: ColorColumn[]
}

export function ColorClient({ colors }: ColorClientProps) {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Cores (${colors.length})`}
                    description="Gerencie as cores para os produtos da sua loja"
                />

                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <PlusIcon className="size-4 mr-2" />
                    Adc novo
                </Button>
            </div>

            <Separator />

            <DataTable
                columns={columns}
                data={colors}
                searchKey="name"
            />

            <Heading title="API" description="Chamadas API para Cores" />

            <Separator />

            <ApiList entityName="colors" entityIdName="colorId" />
        </>
    )
}
