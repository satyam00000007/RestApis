const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/satyamDb",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('database connection is successfull');
}).catch((e)=>{
    console.log("No connection",e);
})