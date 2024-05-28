import { ButtonHTMLAttributes } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
    isIconOnly?: boolean
    isLoading?: boolean
    isFullWidth?: boolean
    pill?: boolean
}
