'use client'

import { CopyIcon, ServerIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import { toast } from "sonner"

interface ApiAlertProps {
    title: string
    description: string
    variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export function ApiAlert({ title, description, variant = "public" }: ApiAlertProps) {
    function onCopy() {
        navigator.clipboard.writeText(description)

        toast.success("Rota API copiada para a área de transferência")
    }

    return (
        <Alert>
            <ServerIcon className="size-4" />

            <AlertTitle className="flex items-center gap-x-2">
                {title}

                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            
            <AlertDescription className="flex items-center justify-between mt-4">
                <code className="relative px-[0.3rem] py-[0.2rem] text-sm font-semibold font-mono rounded bg-muted">
                    {description}
                </code>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onCopy}
                >
                    <CopyIcon className="size-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}
