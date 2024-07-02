'use client'

import { useParams, useRouter } from "next/navigation"

import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { Heading } from "../../settings/_components/Heading"
import { OrderColumn, columns } from "./Columns"

interface OrderClientProps {
    orders: OrderColumn[]
}

export function OrderClient({ orders }: OrderClientProps) {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <Heading
                title={`Pedidos (${orders.length})`}
                description="Gerencie os pedidos da sua loja"
            />

            <Separator />

            <DataTable
                columns={columns}
                data={orders}
                searchKey="products"
            />
        </>
    )
}
