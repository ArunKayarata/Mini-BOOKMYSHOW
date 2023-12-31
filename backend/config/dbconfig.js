const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connection established");
}).catch(err=>{
    console.log("error happened")
});