import { DEFAULT_USER_RECORD } from './constants'
import { DatabaseStructure } from './types'

export default {
    users: [DEFAULT_USER_RECORD],
    config: {
        perUnit: 1000,
        downRequired: 0.2,
    },
} as DatabaseStructure
