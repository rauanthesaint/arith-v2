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
            if (response.status === 200) router.push('/engineering')
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
                <Spacer y={8} />
                <Input
                    label="E-mail"
                    size="lg"
                    placeholder="example@domain.domain"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    id="email"
                />
                <Spacer y={4} />
                <Input
                    label="Password"
                    size="lg"
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    id="password"
                    type="password"
                />
                <Spacer y={12} />
                <Button fullWidth type="submit" color="secondary">
                    Next
                </Button>
                <Spacer y={4} />
                <p className="text-center">
                    <Link color="primary" href="#">
                        I&nbsp;forgot or&nbsp;don&rsquo;t have access
                        to&nbsp;my&nbsp;email
                    </Link>
                </p>
            </form>
        </main>
    )
}
