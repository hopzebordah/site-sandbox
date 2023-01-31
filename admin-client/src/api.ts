import axios, { AxiosRequestConfig } from 'axios'

export const verifyLogin = async (): Promise<boolean> => {
    try {
        const response = await apiRequest({
            url: '/api/admin/login/verify',
        })
        return response.status === 200
    } catch (err) {
        return false
    }
}

const apiRequest = (config: AxiosRequestConfig) => {
    if (!config.url) throw new Error('Cannot make request to empty url')

    const modifiedConfig: AxiosRequestConfig = {
        method: 'GET',
        ...config,
        withCredentials: true,
    }

    try {
        return axios(modifiedConfig)
    } catch (err) {
        console.error('Error making request', err)
        throw err
    }
}
