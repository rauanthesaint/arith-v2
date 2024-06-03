import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const getIdFromToken = (): string => {
    const token = Cookies.get('jwt')
    if (!token) return ''
    const decodedToken = jwt.decode(token)
    let id: string | undefined
    if (
        decodedToken &&
        typeof decodedToken !== 'string' &&
        decodedToken !== null
    ) {
        id = decodedToken.id as string
    } else id = ''
    return id
}

export default getIdFromToken
