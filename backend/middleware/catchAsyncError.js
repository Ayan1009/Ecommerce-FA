// Exporting a higher-order function that wraps an asynchronous function
module.exports = (theFunc) => (req, res, next) => {
    // Resolving the promise returned by the asynchronous function
    // If the promise rejects, the error is passed to the next middleware (error handler)
    Promise.resolve(theFunc(req, res, next)).catch(next);
};
 