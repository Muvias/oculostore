"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./CellAction"

export type SizeColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "value",
        header: "valor",
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
