'use client'

import { useParams, useRouter } from "next/navigation"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { Heading } from "../../settings/_components/Heading"
import { BillboardColumn, columns } from "./Columns"

interface BillboardClientProps {
    billboards: BillboardColumn[]
}

export function BillboardClient({ billboards }: BillboardClientProps) {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Outdoors (${billboards.length})`}
                    description="Gerencie os outdoors da sua loja"
                />

                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <PlusIcon className="size-4 mr-2" />
                    Adc novo
                </Button>
            </div>

            <Separator />

            <DataTable
                columns={columns}
                data={billboards}
                searchKey="label"
            />

            <Heading title="API" description="Chamadas API para Outdoors" />

            <Separator />

            <ApiList entityName="billboards" entityIdName="outdoorId" />
        </>
    )
}
