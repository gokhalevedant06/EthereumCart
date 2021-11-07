const express = require('express')
const dotenv = require('dotenv') 
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// to secure api keys and passwords
dotenv.config({path:'./config.env'}) 
const PORT = process.env.PORT;

//Importing conn.js for database conneciton
require('./db/conn');

// middleware to parse cookies
app.use(cookieParser());

//using middleware to parse json data
app.use(express.json());

//Importing auth for authentication of users
app.use('/',require('./routes/auth'))
app.use('/product',require('./routes/products'))

app.listen(PORT,()=>{
    console.log(`EthereumCart is listening at http://localhost:${PORT}`)
})

module.exports = {
    
}