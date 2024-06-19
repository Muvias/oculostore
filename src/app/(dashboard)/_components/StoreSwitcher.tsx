'use client'

import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { useStoreModal } from "@/hooks/use-store-modal"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon, StoreIcon } from "lucide-react"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find((item) => item.value === params.storeId)
    const onStoreSelect = (store: { value: string, label: string }) => {
        setIsOpen(false)

        router.push(`/${store.value}`)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size='sm'
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-label="Selecione uma Loja"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="size-4 mr-2" />

                    {currentStore?.label}

                    <ChevronsUpDownIcon className="size-4 ml-auto shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Procurar loja..." />

                        <CommandEmpty>Nenhuma loja encontrada</CommandEmpty>

                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    value={store.value}
                                    className="text-sm"
                                >
                                    <StoreIcon className="size-4 mr-2" />

                                    {store.label}

                                    <CheckIcon
                                        className={cn("size-4 ml-auto",
                                            currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>

                    <CommandSeparator />

                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setIsOpen(false)
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircleIcon className="size-5 mr-2" />

                                Criar Loja
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
