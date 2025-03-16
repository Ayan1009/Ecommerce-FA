const express = require("express");
const app = express(); 
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const product= require('./controller/product')
const path=require('path')
const orders = require('./controller/orders');

const corsOptions = {
    origin: 'http://localhost:5173', // Allow only your frontend origin
    credentials: true, // Allow cookies and credentials
  };

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Configuration for environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
    // Load environment variables from the .env file if the environment is not production
    require("dotenv").config({
        path: "backend/config/.env",
    });
};
// Serve static files for uploads and products
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', express.static(path.join(__dirname, 'products')));

//import Routes
const user = require("./controller/user");
app.use("/api/v2/user", user);
app.use("/api/v2/product", product);
app.use("/api/v2/orders", orders);
app.use(ErrorHandler);
module.exports= app;