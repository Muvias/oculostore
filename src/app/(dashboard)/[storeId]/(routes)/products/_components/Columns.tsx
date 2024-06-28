"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./CellAction"

export type ProductColumn = {
    id: string
    name: string
    price: string
    category: string
    size: string
    color: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "isArchived",
        header: "Arquivado",
    },
    {
        accessorKey: "isFeatured",
        header: "Destaque",
    },
    {
        accessorKey: "price",
        header: "Preço",
    },
    {
        accessorKey: "category",
        header: "Categoria",
    },
    {
        accessorKey: "size",
        header: "Tamanho",
    },
    {
        accessorKey: "color",
        header: "Cor",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}

                <div className="size-4 rounded-full border" style={{ backgroundColor: row.original.color }} />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
