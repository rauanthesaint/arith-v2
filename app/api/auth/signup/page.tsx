'use client'
import { Button, Input, Link, LinkIcon, Spacer } from '@nextui-org/react'
import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [formData, setFormData] = useState<{
        name: string
        email: string
        password: string
    }>({
        name: '',
        email: '',
        password: '',
    })

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
            if (response.status === 201) router.push('/settings')
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl text-center font-semibold">
                    Create Your
                    <br />
                    Arithmetica Account
                </h1>
                <div className="bg-neutral-800 rounded-lg">
                    <Input
                        classNames={{
                            inputWrapper:
                                'bg-neutral-800 group-data-[focus=true]:bg-neutral-800',
                        }}
                        label="Name"
                        radius="sm"
                        size="lg"
                        placeholder="Jane"
                        onChange={handleChange}
                        value={formData.name}
                        name="name"
                        id="name"
                    />
                    <Input
                        classNames={{
                            inputWrapper:
                                'bg-neutral-800 group-data-[focus=true]:bg-neutral-800 shadow-none',
                        }}
                        label="E-mail"
                        placeholder="example@domain.domain"
                        size="lg"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <Input
                        classNames={{
                            inputWrapper:
                                'bg-neutral-800 group-data-[focus=true]:bg-neutral-800',
                        }}
                        name="password"
                        id="password"
                        label="Password"
                        radius="sm"
                        type="password"
                        size="lg"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <div>
                    <Button
                        fullWidth
                        type="submit"
                        size="lg"
                        radius="sm"
                        color="primary"
                    >
                        Next
                    </Button>
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
                </div>
            </form>
        </main>
    )
}
