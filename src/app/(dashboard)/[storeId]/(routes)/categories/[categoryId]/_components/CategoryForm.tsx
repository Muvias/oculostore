'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { Heading } from "../../../settings/_components/Heading"

interface CategoryFormProps {
    initialData: Category | null
    billboards: Billboard[]
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>;

export function CategoryForm({ initialData, billboards }: CategoryFormProps) {
    const params = useParams()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Editar categoria" : "Criar categoria"
    const description = initialData ? "Editar categoria" : "Adicionar uma nova categoria"
    const toastMessage = initialData ? "Categoria atualizada" : "Categoria criada"
    const action = initialData ? "Salvar mudanças" : "Criar"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboardId: ''
        }
    })

    async function onSubmit(data: CategoryFormValues) {
        try {
            setLoading(true)

            if (initialData) {
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/categories`, data)
            }

            router.push(`/${params.storeId}/categories`)
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

            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)

            router.push(`/${params.storeId}/categories`)
            router.refresh()

            toast.success("Categoria deletada")
        } catch (error) {
            toast.error("Tenha certeza de remover todos os produtos que usam essa categoria primeiro.")
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
                                            placeholder="Nome da categoria"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Outdoor</FormLabel>

                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Selecione um outdoor"
                                                />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

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
