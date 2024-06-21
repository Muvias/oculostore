'use client'

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { Heading } from "../../settings/_components/Heading"

interface BillboardClientProps { }

export function BillboardClient({ }: BillboardClientProps) {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Outdoors (0)"
                    description="Gerencie os outdoors da sua loja"
                />

                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <PlusIcon className="size-4 mr-2" />
                    Adc novo
                </Button>
            </div>

            <Separator />
        </>
    )
}
