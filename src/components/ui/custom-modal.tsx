'use client'
import { useModal } from '@/providers/modal-provider'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@ui/dialog'
import React from 'react'

type Props = {
  title: string
  subheading: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal()
  return (
    <Dialog
      open={isOpen || defaultOpen}
      onOpenChange={setClose}
    >
      <DialogContent className="overflow-auto md:max-h-[700px] md:h-fit h-full bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal