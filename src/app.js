const express = require("express");
require("./dbs/connection")
const studentModel = require("./models/student");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello from other side")
});

app.post("/students",(req,res)=>{
    const user = new studentModel(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`)
})



