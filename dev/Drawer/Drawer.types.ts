import { HTMLAttributes, ReactNode } from 'react'

export interface IDrawerProps extends HTMLAttributes<HTMLDivElement> {
    onClose: () => void
    open: boolean
    align?: 'right' | 'left' | 'top' | 'bottom'
    zIndex?: number
}
