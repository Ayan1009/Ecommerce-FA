// Import the ErrorHandler class from the utils/ErrorHandler module
// This is used for creating and throwing custom errors
const ErrorHandler = require("../utils/ErrorHandler");

// Import the catchAsyncErrors utility
// This is a middleware to handle errors in asynchronous functions automatically
const catchAsyncErrors = require("./catchAsyncError");

// Import the jsonwebtoken (JWT) library
// This library is used for creating, signing, and verifying JSON Web Tokens
const jwt = require("jsonwebtoken");
