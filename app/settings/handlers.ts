import getIdFromToken from '@/utils/getIdFromToken'
import axios from 'axios'
import Cookies from 'js-cookie'

export const handleClickLogOut = async () => {
    try {
        const result = await axios.post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/eject`
        )
        if (result.status === 200) {
            Cookies.remove('jwt')
            window.location.assign('/api/auth/signin')
        }
        console.log(result.data)
    } catch (error) {
        console.log(error)
    }
}

export const handleDeletingAccount = async () => {
    const id = getIdFromToken()
    try {
        const result = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/delete/${id}`
        )

        if (result.status === 200) {
            Cookies.remove('jwt')
            window.location.assign('/api/auth/signup')
        }
        console.log(result.data)
    } catch (error) {
        console.log(error)
    }
}
