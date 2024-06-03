'use client'
import { Input, Button, Spacer, Link } from '@nextui-org/react'
import { useState, ChangeEvent } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function Page() {
    const [formData, setFormData] = useState<{
        email: string
        password: string
    }>({
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
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/approve`,
                formData,
                { withCredentials: true }
            )
            if (response.status === 200) router.push('/settings')
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl text-center font-semibold">
                    Sign in for Arithmetica
                </h1>

                <div className="bg-neutral-800 rounded-lg">
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
                        label="Password"
                        radius="sm"
                        type="password"
                        size="lg"
                        name="password"
                        id="password"
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
                    <p className="text-center">
                        <Link href="@">
                            I&nbsp;forgot or&nbsp;don&rsquo;t have access
                            to&nbsp;my&nbsp;email
                        </Link>
                        <Spacer y={1} />
                        <Link href="@">I&nbsp;forgot my&nbsp;password</Link>
                    </p>
                </div>
            </form>
        </main>
    )
}
