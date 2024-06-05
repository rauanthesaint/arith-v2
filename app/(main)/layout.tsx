// @/(main)/layout.tsx
'use client'
// imports
import { ReactNode } from 'react'
import styles from './layout.module.scss'
import { Header, Sidebar } from '@/components'
import { useLayoutEffect } from 'react'
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {
    useLayoutEffect(() => {
        // const token = Cookies.get('jwt')
        const token = true
        if (!token) {
            redirect('/api/auth/signin')
        }
    }, [])

    return (
        <div className={styles.layout}>
            <Sidebar />
            <Header />
            {children}
        </div>
    )
}
