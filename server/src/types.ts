export type ServiceStatus = 'UP' | 'DOWN'

export type User = {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export type SiteConfig = {
    perUnit: number
    downRequired: number
}

export type DatabaseStructure = {
    users: User[]
    config: SiteConfig
}

export type HealthData = { [key: string]: ServiceStatus }

export type CookieData = {
    userId: string
    email: string
}
