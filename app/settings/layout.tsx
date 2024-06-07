// @/(main)/layout.tsx
'use client'
// imports
import { ReactNode } from 'react'
import { useLayoutEffect } from 'react'
import { redirect, usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import styles from './styles.module.scss'
import { Button } from '@nextui-org/react'
import { NavArrowLeft } from 'iconoir-react/regular'

export default function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {
    useLayoutEffect(() => {
        const token = Cookies.get('jwt')
        if (!token) {
            redirect('/api/auth/signin')
        }
    }, [])

    const router = useRouter()
    const path = usePathname().slice(1).replace('/', ' > ')

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Button
                        variant="flat"
                        onPress={() => router.back()}
                        isIconOnly
                        size="sm"
                    >
                        <NavArrowLeft />
                    </Button>
                    <span className={styles.title}>{path}</span>
                </div>
            </header>
            {children}
        </div>
    )
}
