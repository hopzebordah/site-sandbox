import axios from 'axios'

export const verifyLogin = async (): Promise<boolean> => {
    try {
        const response = await axios.get('/api/admin/login/verify', {
            withCredentials: true,
        })
        return response.status === 200
    } catch (err) {
        return false
    }
}
