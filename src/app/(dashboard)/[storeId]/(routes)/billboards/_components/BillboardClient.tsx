'use client'

import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { Heading } from "../../settings/_components/Heading"
import { BillboardColumn, columns } from "./Columns"
import { DataTable } from "@/components/ui/data-table"

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
        </>
    )
}
