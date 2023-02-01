import { DEFAULT_USER_RECORD } from './constants.js'
import { DatabaseStructure } from './types.js'

export default {
    users: [DEFAULT_USER_RECORD],
    config: {
        perUnit: 1000,
        downRequired: 0.2,
    },
} as DatabaseStructure
