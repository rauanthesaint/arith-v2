'use client'

import { ReactNode } from 'react'
import styles from './layout.module.scss'
import Image from 'next/image'
import logo from '@/public/static/img/logo.svg'
import { Button, Link } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { Switch } from '@nextui-org/react'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const switchRoutes = (path: string): { title: string; link: string } => {
    switch (path) {
        case '/signin':
            return { title: 'Sign Up', link: '/signup' }
        case '/signup':
            return { title: 'Sign In', link: '/signin' }
        default:
            return { title: '', link: '' }
    }
}

export default function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {
    const pathname = usePathname()
    const startIndex = pathname.lastIndexOf('/')
    const path = pathname.slice(startIndex)
    const details = switchRoutes(path)

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Image src={logo} alt="Arithmetica Logo" height={36} />
                    <Switch
                        isSelected={theme === 'dark'}
                        onValueChange={() => {
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }}
                    >
                        Airplane mode
                    </Switch>
                    <Button
                        as={Link}
                        radius="sm"
                        href={`/api/auth${details.link}`}
                        variant="bordered"
                    >
                        {details.title}
                    </Button>
                </div>
            </header>
            <div className={styles.container}>{children}</div>
        </div>
    )
}
