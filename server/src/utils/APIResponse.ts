// This class represents a generic API response that can be used to standardize the structure of responses sent from the server to the client. It includes properties for the HTTP status code, data, message, and a success flag indicating whether the operation was successful.
class APIResponse<T> {

    // HTTP status code of the response
    statusCode: number

    // data associated with the response (null in this case)
    data: T

    // message associated with the response (default is "Success")
    message: string

    // success flag indicating whether the operation was successful (true if status code is less than 400)
    success: boolean

    constructor(
        statusCode: number, data: T, message = "Success"
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export default APIResponse