// Custom error class for API errors
class APIError extends Error {

    // HTTP status code of the error
    statusCode: number

    // data associated with the error (null in this case)
    data: null

    // success flag indicating whether the operation was successful (false in this case)
    success: boolean

    // array of errors associated with the API error
    errors: unknown[]

    // constructor to initialize the APIError instance with status code, message, errors, and stack trace
    constructor(
        statusCode: number,
        message: string = "Something went wrong!",
        errors: unknown[] = [],
        stack = ""
    ) {
        // Call the parent class (Error) constructor with the provided message
        super(message)

        // Set the properties of the APIError instance
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        // If a stack trace is provided, use it; otherwise, capture the current stack trace
        stack ?
            this.stack = stack :
            Error.captureStackTrace(this, this.constructor)
    }
}

export default APIError