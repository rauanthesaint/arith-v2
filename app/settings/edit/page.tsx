'use client'

import { Button, Input } from '@nextui-org/react'
import styles from '../styles.module.scss'
import { Mail, NavArrowRight } from 'iconoir-react/regular'
import { getUser } from '@/utils/api/api'
import { useEffect, useState } from 'react'
import getIdFromToken from '@/utils/getIdFromToken'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react'
import { handleDeletingAccount } from '../handlers'

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
                    <div className={styles.menu}>
                        <ChangeEmailModal user={user} />
                    </div>
                    <DeleteAccount />
                </div>
            </section>
        </main>
    )
}

function ChangeEmailModal({ user }: { user: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button
                variant="flat"
                className={styles.menu__button}
                fullWidth
                onPress={onOpen}
                startContent={<Mail />}
            >
                <div>
                    Email
                    <div className="flex text-default-400">
                        <span>{user?.email}</span>
                        <NavArrowRight />
                    </div>
                </div>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="h-[90%] sm:h-auto">
                    <ModalHeader className="flex flex-col gap-1">
                        Change Email
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            placeholder="example@domain.domain"
                            description=""
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" fullWidth>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function DeleteAccount() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <Button variant="flat" onPress={onOpen} color="danger" fullWidth>
                Delete Account
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">
                                Delete Account
                            </ModalHeader>
                            <ModalBody>
                                <p></p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onPress={handleDeletingAccount}
                                    color="danger"
                                    fullWidth
                                >
                                    Delete Account
                                </Button>
                                <Button onPress={onClose} fullWidth>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
