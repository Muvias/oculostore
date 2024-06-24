'use client'

import { useEffect, useState } from "react"
import { Button } from "./button"
import { ImagePlusIcon, TrashIcon } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}

export function ImageUpload({ value, onChange, onRemove, disabled }: ImageUploadProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    function onUpload(result: any) {
        onChange(result.info.secure_url)
    }

    if (!isMounted) return null;

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                {value.map((imageUrl) => (
                    <div key={imageUrl} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                onClick={() => onRemove(imageUrl)}
                            >
                                <TrashIcon className="size-4" />
                            </Button>
                        </div>

                        <Image
                            src={imageUrl}
                            alt="imagem"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset="rix42vsc"
            >
                {({ open }) => {
                    function onClick() {
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={disabled}
                            onClick={onClick}
                        >
                            <ImagePlusIcon className="size-4 mr-2" />

                            Importe uma imagem
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}
