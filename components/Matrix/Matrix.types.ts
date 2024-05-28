import { HTMLAttributes } from 'react'

export interface IMatrixProps extends HTMLAttributes<HTMLDivElement> {
    data: string[][]
    index?: number
    onRemove: (id: string) => void
    // onSelect?: (id: string) => void
}
