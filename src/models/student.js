const mongoose = require("mongoose");
const validators = require("validator");

const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:3
    },
    email:{
        type:String,
        require:true,
        unique:[true,"Email id already Present"],
        validate(value){
            if(!validators.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Sutdent",studentSchema);