// Define the ErrorHandler class that extends the built-in Error class
// This allows for custom error handling with additional properties like statusCode
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        // Call the parent class constructor with the error message
        super(message);

        // Assign a status code to the error (default is 500 if not provided)
        this.statusCode = statusCode || 500;

        // Capture the stack trace for debugging purposes
        // This helps identify where the error was instantiated
        Error.captureStackTrace(this, this.constructor);
    } 
}

// Export the ErrorHandler class so it can be used in other parts of the application
module.exports = ErrorHandler;
