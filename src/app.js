const express = require('express');

const app = express();

app.use("/test", (req,res) =>{
    res.send("Hello am listening from response page method..... :)")
})

app.use("/hello", (req,res) =>{
    res.send("Hello am listening hello method !!!!!!!!!!!!!..... :@@@@@@@ ##")
})

app.listen(3000, () =>{
    console.log("Server is listening on port 3000");
});