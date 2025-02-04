// Import the ErrorHandler class
// This custom class is used to create and handle application-specific errors.
const ErrorHandler = require("../utils/ErrorHandler");

// Export the error-handling middleware
// This function acts as middleware to handle errors in the application and provide appropriate responses.
module.exports = (err, req, res, next) => {
    // Set default values for the error's status code and message
    err.statusCode = err.statusCode || 500; // Default to 500 (Internal Server Error) if no status code is provided
    err.message = err.message || "Internal server Error"; // Default message for errors
 
    // Handle invalid MongoDB ObjectId errors
    if (err.name === "CastError") {
        const message = `Resources not found with this id. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400); // Create a new error instance with status code 400 (Bad Request)
    }

    // Handle duplicate key errors (e.g., unique constraint violations in MongoDB)
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`; // Inform the user about the duplicate key
        err = new ErrorHandler(message, 400); // Set status code to 400 (Bad Request)
    }

    // Handle invalid JWT (JSON Web Token) errors
    if (err.name === "JsonWebTokenError") {
        const message = `Your URL is invalid. Please try again later.`; // Inform the user the token is invalid
        err = new ErrorHandler(message, 400); // Set status code to 400 (Bad Request)
    }

    // Handle expired JWT errors
    if (err.name === "TokenExpiredError") {
        const message = `Your URL is expired. Please try again later.`; // Inform the user the token has expired
        err = new ErrorHandler(message, 400); // Set status code to 400 (Bad Request)
    }

    // Send the error response
    // Respond with the error status code and message, indicating failure
    res.status(err.statusCode).json({
        success: false, // Indicate the operation was unsuccessful
        message: err.message, // Include the error message
    });
};
