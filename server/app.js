const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

app.use(express.static('../client'));
app.use(express.json());//middlewear to parse JSON datas
app.use(express.urlencoded({extended : true}));

async function mongoConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connection established");
    } catch (error) {
        console.log("Database Connection error : ",error);
    }

    
}
   mongoConnect() ;

   let usersSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    password : String,
    
})

let users = mongoose.model("users",usersSchema);

   app.post('/users', async (req,res) =>{

    let body = req.body;
    console.log("body : ",body)

    let name = req.body.name;
    console.log("name : ",name)
    

    let new_user = await users.create(body);

    if(new_user){
        res.status(200).send("User created successfully");
        return;
    }
    else{
        res.status(400).send("User creation failed");
        return;
    }
})

    app.get('/users', async (req,res) => {
    let userData = await users.find();
    console.log("userData : ",userData);

    res.status(200).send(userData);
    return;
    })


    app.get('/user/:id', async (req,res) => {
        let id = req.params.id;
        console.log("id :",id);

        let userData1 = await users.find({_id : id});
        console.log("userData : ",userData1);
    
        res.status(200).send(userData1);
        return;
        })

// app.get('/test',
//     (req,res,next) => {
//         console.log("First Middlewear");
//         next();
//     },
//     (req,res,next) => {
//         console.log("Second Middlewear");
//         next();
//     },
//     (req,res) => {
//         console.log("Third Middlewear");
//         res.status(200).send("Success");
//     },

// );





app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})