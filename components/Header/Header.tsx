import { FC, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { Button, DropdownSection, Switch } from '@nextui-org/react'
import getIdFromToken from '@/utils/getIdFromToken'
import axios from 'axios'
import { Bell, LogOut, NavArrowDown, Settings } from 'iconoir-react'
import { useTheme } from 'next-themes'

import {
    Dropdown,
    DropdownTrigger,
    DropdownItem,
    DropdownMenu,
} from '@nextui-org/react'
const Header: FC = () => {
    const [user, setUser] = useState<{ name: string; email: string }>()

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
        const getUser = async () => {
            const id = getIdFromToken()

            try {
                const user = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/get/${id}`
                )
                setUser(user.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <header className={styles.header}>
            <div></div>
            <div>
                <Button isIconOnly radius="full" variant="flat">
                    <Bell />
                </Button>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            radius="full"
                            endContent={<NavArrowDown />}
                            variant="flat"
                        >
                            {user?.email}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat">
                        <DropdownSection>
                            <DropdownItem
                                endContent={<Settings />}
                                href="/settings"
                            >
                                Account Settings
                            </DropdownItem>
                            <DropdownItem
                                isReadOnly
                                endContent={
                                    <Switch
                                        size="sm"
                                        isSelected={theme === 'dark'}
                                        onValueChange={() => {
                                            setTheme(
                                                theme === 'dark'
                                                    ? 'light'
                                                    : 'dark'
                                            )
                                        }}
                                    />
                                }
                            >
                                Dark Mode
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                            <DropdownItem
                                color="danger"
                                className="text-danger"
                                endContent={<LogOut />}
                            >
                                Log Out
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header
