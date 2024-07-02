"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
    id: string
    phone: string
    address: string
    totalPrice: string
    products: string
    isPaid: boolean
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Produtos",
    },
    {
        accessorKey: "phone",
        header: "Telefone",
    },
    {
        accessorKey: "address",
        header: "Endereço",
    },
    {
        accessorKey: "totalPrice",
        header: "Preço total",
    },
    {
        accessorKey: "isPaid",
        header: "Pago",
    }
]
