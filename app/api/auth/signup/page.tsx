'use client'
import { Button, Input, Link, LinkIcon, Spacer } from '@nextui-org/react'
import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, NavArrowLeft } from 'iconoir-react/regular'

export default function Page() {
    const [formData, setFormData] = useState<{
        email: string
        password: string
    }>({
        email: '',
        password: '',
    })

    const [isNext, setIsNext] = useState<boolean>(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const router = useRouter()
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/create`,
                formData,

                { withCredentials: true }
            )
            if (response.status === 201) router.push('/engineering')
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                {isNext ? (
                    <motion.div>
                        <h1 className="text-2xl text-center font-semibold">
                            Craete a Password
                        </h1>
                        <Spacer y={8} />
                        <Input
                            label="Password"
                            size="lg"
                            onChange={handleChange}
                            value={formData.password}
                            name="password"
                            id="password"
                            type="password"
                            description="The password must be no shorter than 8 characters and may contain numbers and special characters."
                        />
                        <Spacer y={16} />
                        <Button
                            onPress={() => setIsNext(!isNext)}
                            startContent={<ArrowLeft height={16} />}
                            fullWidth
                            variant="flat"
                            type="button"
                        >
                            Back
                        </Button>
                        <Spacer y={4} />
                        <Button fullWidth type="submit" color="secondary">
                            Create an Account
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div>
                        <h1 className="text-2xl text-center font-semibold">
                            Enter an Email Address
                        </h1>
                        <Spacer y={8} />
                        <p className="text-default-400 text-center">
                            We will use this email address to authenticate you
                        </p>
                        <Spacer y={4} />
                        <Input
                            label="E-mail"
                            size="lg"
                            placeholder="example@domain.domain"
                            onChange={handleChange}
                            value={formData.email}
                            variant="flat"
                            name="email"
                            id="email"
                        />
                        <Spacer y={12} />
                        <Button
                            fullWidth
                            onPress={() => setIsNext(!isNext)}
                            color="secondary"
                        >
                            Next
                        </Button>
                    </motion.div>
                )}
                <Spacer y={4} />
                <p className="text-center w-full">
                    By&nbsp;joining, you agree to&nbsp;our{' '}
                    <Link href="#" isExternal>
                        Terms of&nbsp;Service
                        <LinkIcon />
                    </Link>{' '}
                    and{' '}
                    <Link href="#" isExternal>
                        Privacy Policy
                        <LinkIcon />
                    </Link>
                </p>
            </form>
        </main>
    )
}
