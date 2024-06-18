"use client"

import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useStoreModal } from "@/hooks/use-store-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Modal } from "../ui/modal"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(1),
})

export function StoreModal() {
    const storeModal = useStoreModal()

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)

            const response = await axios.post("/api/stores", values)

            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title="Criar Loja"
            description="Adicionar nova loja para gerenciar os produtos e categorias"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="E-Commerce"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-end w-full pt-6 space-x-2">
                                <Button
                                    variant="outline"
                                    disabled={isLoading}
                                    onClick={storeModal.onClose}
                                >
                                    Cancelar
                                </Button>

                                <Button type="submit" disabled={isLoading}>
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
        </Modal>
    )
}