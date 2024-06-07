'use client'
import { getUser } from '@/utils/api/api'
import getIdFromToken from '@/utils/getIdFromToken'
import { Button, Link, Skeleton } from '@nextui-org/react'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { handleClickLogOut } from './handlers'
import { Lock } from 'iconoir-react/regular'
import { HalfMoon, LogOut, NavArrowRight } from 'iconoir-react'

export default function Page() {
    const [user, setUser] = useState<{ email: string }>()

    useEffect(() => {
        const id = getIdFromToken()
        getUser(id).then((user) => {
            setUser({ email: user?.data.email })
        })
    }, [])

    return (
        <main>
            <section className={styles.content}>
                <div className={styles.container}>
                    {!user ? (
                        <Skeleton className="h-6 w-3/5 rounded-lg" />
                    ) : (
                        <Button
                            variant="ghost"
                            size="lg"
                            as={Link}
                            href="/settings/edit"
                            className={styles.username}
                        >
                            {user.email}
                        </Button>
                    )}

                    <div className={styles.menu}>
                        <Button
                            variant="flat"
                            as={Link}
                            fullWidth
                            href="/settings/privacy"
                            radius="none"
                            startContent={<Lock />}
                            className={styles.menu__button}
                        >
                            <div>
                                Privacy & Security
                                <NavArrowRight />
                            </div>
                        </Button>
                        <Button
                            variant="flat"
                            as={Link}
                            fullWidth
                            href="/settings/privacy"
                            radius="none"
                            startContent={<HalfMoon />}
                            className={styles.menu__button}
                        >
                            <div>
                                Appearance
                                <NavArrowRight />
                            </div>
                        </Button>
                    </div>
                    <Button
                        fullWidth
                        variant="flat"
                        onPress={handleClickLogOut}
                        color="danger"
                        className={styles.menu__button}
                        startContent={<LogOut />}
                    >
                        Log Out
                    </Button>
                </div>
            </section>
        </main>
    )
}
