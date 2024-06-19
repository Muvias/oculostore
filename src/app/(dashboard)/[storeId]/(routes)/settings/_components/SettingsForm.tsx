'use client'

import { Store } from "@prisma/client"
import { Heading } from "./Heading"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface SettingsFormProps {
    initialData: Store
}

export function SettingsForm({ initialData }: SettingsFormProps) {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Configurações"
                    description="Gerenciar preferências da loja"
                />

                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => { }}
                >
                    <TrashIcon className="size-4" />
                </Button>
            </div>

            <Separator />

            
        </>
    )
}
