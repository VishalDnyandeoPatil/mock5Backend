const express = require("express");
const {connection} = require("./config/db");
const {router}= require('./routes/managementRoute')
const { routerEmployee }= require('./routes/employeeRoute')
const cors = require ('cors');
require('dotenv').config();
const port = process.env.port;

const app = express();
app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send("Home Page")
// })

app.use('/', router);
app.use('/dashboard', routerEmployee);




app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error);
        console.log("Cannot connected to db")
    }
});