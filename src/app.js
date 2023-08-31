const express = require("express");
require("./dbs/connection")
const studentModel = require("./models/student");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello from other side")
});

app.post("/students",async(req,res)=>{
    const user = new studentModel(req.body);
    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })

    try{
        const createUser= await user.save();
        return res.status(201).send(createUser);
    }catch(e){
        return res.status(400).send(e);
    }
});

app.get("/list",async(req,res)=>{
    try{
        const userList= await studentModel.find();
        return res.status(201).send(userList);
    }catch(e){
        return res.status(400).send(e);
    }
});

app.get("/student/:id",async(req,res)=>{
    try{
        let _id = req.params.id;
        const userList= await studentModel.findById({_id});
        if(!userList){
            return res.status(404).send();
        }else{
            return res.status(201).send(userList);
        }
    }catch(e){
        return res.status(500).send(e);
    }
});

app.delete("/student/:id",async(req,res)=>{
    try{
        let _id = req.params.id;
        const userList= await studentModel.findByIdAndDelete({_id});
        if(!_id){
            return res.status(404).send();
        }
        res.status(201).send(userList);
    }catch(e){
        return res.status(500).send(e);
    }
});

app.patch("/student/:id",async(req,res)=>{
    try{
        let _id = req.params.id;
        const userList= await studentModel.findByIdAndUpdate({_id}, req.body,{new:true});
        if(!_id){
            return res.status(404).send();
        }
        res.status(201).send(userList);
    }catch(e){
        return res.status(500).send(e);
    }
});

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`)
})



