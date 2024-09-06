const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

app.use(express.static('../client'));
app.use(express.json());

async function mongoConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connection established");
    } catch (error) {
        console.log("Database Connection error : ",error);
    }
}
let users = new 

app.get('/test',
    (req,res,next) => {
        console.log("First Middlewear");
        next();
    },
    (req,res,next) => {
        console.log("Second Middlewear");
        next();
    },
    (req,res) => {
        console.log("Third Middlewear");
        res.status(200).send("Success");
    },

);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})