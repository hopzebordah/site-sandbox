import express from 'express'
import { ClientError, GenericError } from './errors'
import { ValidationError } from 'suretype'
import path from 'path'
import { fileURLToPath } from 'url'

export const errorHandler = (res: express.Response) => {
    return (rawErr: unknown) => {
        let err: GenericError
        if (rawErr instanceof GenericError) {
            err = rawErr
        } else if (rawErr instanceof ValidationError) {
            const explanation = rawErr.errors[0].message
            err = new ClientError(explanation)
        } else {
            console.error(rawErr as Error)
            err = new GenericError()
        }
        res.status(err.httpCode ?? 500).json({ message: err.msg })
    }
}

export const getPath = (dir: string) => {
    return path.join(path.dirname(fileURLToPath(import.meta.url))) + dir
}
