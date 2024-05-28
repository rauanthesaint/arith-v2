// @/(main)/layout.tsx
// imports
import { ReactNode } from 'react'
import styles from './layout.module.scss'
import { Sidebar } from '@/components'

export default function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <header>Jead</header>
            {children}
        </div>
    )
}
