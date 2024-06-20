'use client'

import { useEffect, useState } from "react"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"

interface AlertModalProps {
    isOpen: boolean
    loading: boolean
    onClose: () => void
    onConfirm: () => void
}

export function AlertModal({ isOpen, loading, onClose, onConfirm }: AlertModalProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null;

    return (
        <Modal
            title="Você tem certeza?"
            description="Esta ação não pode ser desfeita."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button
                    variant="outline"
                    disabled={loading}
                    onClick={onClose}
                >
                    Cancelar
                </Button>

                <Button
                    variant="destructive"
                    disabled={loading}
                    onClick={onConfirm}
                >
                    Continuar
                </Button>
            </div>
        </Modal>
    )
}
