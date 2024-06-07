import axios, { AxiosResponse } from 'axios'

export async function getUser(
    id: string
): Promise<AxiosResponse<any, any> | null> {
    try {
        const user = await axios.get(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/get/${id}`
        )
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}
