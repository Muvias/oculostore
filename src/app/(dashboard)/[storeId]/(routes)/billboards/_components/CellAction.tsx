'use client'

import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axios from "axios"
import { CopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { BillboardColumn } from "./Columns"

interface CellActionProps {
    data: BillboardColumn
}

export function CellAction({ data }: CellActionProps) {
    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    function onCopy() {
        navigator.clipboard.writeText(data.id)

        toast.success("ID copiado para a área de transferência")
    }

    async function onDelete() {
        try {
            setLoading(true)

            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)

            router.refresh()

            toast.success("Outdoor deletado")
        } catch (error) {
            toast.error("Tenha certeza de remover todas as categorias que usam esse outdoor primeiro.")
        } finally {
            setLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="size-8 p-0"
                    >
                        <span className="sr-only">
                            Abrir menu
                        </span>

                        <MoreHorizontalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                        <EditIcon className="size-4 mr-2" />

                        Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={onCopy}>
                        <CopyIcon className="size-4 mr-2" />

                        Copiar ID
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <TrashIcon className="size-4 mr-2" />

                        Deletar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
