'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { Heading } from "./Heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { UseOrigin } from "@/hooks/use-origin"

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ initialData }: SettingsFormProps) {
    const params = useParams()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const originUrl = UseOrigin()

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    async function onSubmit(data: SettingsFormValues) {
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
                    title="Configurações"
                    description="Gerenciar preferências da loja"
                />

                <Button
                    variant="destructive"
                    size="sm"
                    disabled={loading}
                    onClick={() => setIsOpen(true)}
                >
                    <TrashIcon className="size-4" />
                </Button>
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
                                            placeholder="Nome da loja"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button disabled={loading} className="ml-auto" type="submit">
                        Salvar mudanças
                    </Button>
                </form>
            </Form>

            <Separator />

            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${originUrl}/api/${params.storeId}`}
                variant="public"
            />
        </>
    )
}
