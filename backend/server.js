const app = require("./app");

const connectDatabase = require("./db/Database");

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`); // Log the error message
    console.log("Shutting down the server for handling uncaught exception");
    process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server is running on http://localhost:${process.env.PORT}` // Log the server's URL
    );
});

process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`); // Log the error message
    console.log("Shutting down the server due to unhandled promise rejection.");
    server.close(() => {
        process.exit(1); 
    });
});
