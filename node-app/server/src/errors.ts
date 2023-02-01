type ErrorConfig = {
    httpCode?: number
}

export class GenericError extends Error {
    msg: string
    httpCode?: number
    data: any

    constructor(msg?: string, { httpCode = 500 }: ErrorConfig = {}) {
        super(msg)
        this.msg =
            msg || `Oops! We've encountered an error. Please try again later`
        this.httpCode = httpCode || 500
    }
}

export class ServerError extends GenericError {
    constructor(msg?: string, config: ErrorConfig = { httpCode: 500 }) {
        super(msg, config)
    }
}

export class ClientError extends GenericError {
    constructor(msg?: string, config: ErrorConfig = { httpCode: 400 }) {
        super(msg, config)
    }
}

export class NotFoundError extends ClientError {
    constructor(msg?: string, config: ErrorConfig = { httpCode: 404 }) {
        super(msg, config)
    }
}

export class NotAuthorizedError extends ClientError {
    constructor(msg?: string, config: ErrorConfig = { httpCode: 401 }) {
        super(msg, config)
    }
}
