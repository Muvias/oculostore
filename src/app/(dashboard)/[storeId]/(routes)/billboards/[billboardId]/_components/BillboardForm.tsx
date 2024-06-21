'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { UseOrigin } from "@/hooks/use-origin"
import { TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { Heading } from "../../../settings/_components/Heading"

interface BillboardFormProps {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>;

export function BillboardForm({ initialData }: BillboardFormProps) {
    const params = useParams()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const originUrl = UseOrigin()

    const title = initialData ? "Editar outdoor" : "Criar outdoor"
    const description = initialData ? "Editar outdoor" : "Adicionar um novo outdoor"
    const toastMessage = initialData ? "Outdoor atualizado" : "Outdoor criado"
    const action = initialData ? "Salvar mudanças" : "Criar"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })

    async function onSubmit(data: BillboardFormValues) {
        try {
            setLoading(true)

            await axios.patch(`/api/stores/${params.storeId}`, data)

            router.refresh()

            toast.success("Loja atualizada")
        } catch (error) {
            toast.error("Algo deu errado, por favor tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    async function onDelete() {
        try {
            setLoading(true)

            await axios.delete(`/api/stores/${params.storeId}`)

            router.refresh()
            router.push("/")

            toast.success("Loja deletada com sucesso")
        } catch (error) {
            toast.error("Tenha certeza de remover todos os produtos e categorias antes.")
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

            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />

                {initialData && (
                    <Button
                        variant="destructive"
                        size="sm"
                        disabled={loading}
                        onClick={() => setIsOpen(true)}
                    >
                        <TrashIcon className="size-4" />
                    </Button>
                )}
            </div>

            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rótulo</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Rótudo do outdoor"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>

            <Separator />
        </>
    )
}
