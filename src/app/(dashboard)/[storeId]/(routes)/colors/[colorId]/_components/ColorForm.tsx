'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { Heading } from "../../../settings/_components/Heading"

interface ColorFormProps {
    initialData: Color | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: 'Valor precisa ser um código hex para cores válido'
    }),
})

type ColorFormValues = z.infer<typeof formSchema>;

export function ColorForm({ initialData }: ColorFormProps) {
    const params = useParams()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Editar cor" : "Criar cor"
    const description = initialData ? "Editar cor" : "Adicionar um novo cor"
    const toastMessage = initialData ? "Cor atualizada" : "Cor criada"
    const action = initialData ? "Salvar mudanças" : "Criar"

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })

    async function onSubmit(data: ColorFormValues) {
        try {
            setLoading(true)

            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data)
            }

            router.push(`/${params.storeId}/colors`)
            router.refresh()

            toast.success(toastMessage)
        } catch (error) {
            toast.error("Algo deu errado, por favor tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    async function onDelete() {
        try {
            setLoading(true)

            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)

            router.push(`/${params.storeId}/colors`)
            router.refresh()

            toast.success("Cor deletada")
        } catch (error) {
            toast.error("Tenha certeza de remover todos os produtos que usam essa cor primeiro.")
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Nome da cor"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Hex da cor"
                                                {...field}
                                            />

                                            <div className="border p-4 rounded-full" style={{ backgroundColor: field.value }} />
                                        </div>
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
        </>
    )
}
