const express = require('express');

const app = express();

// Below is the route handler creating..
// Order of the routes matter lot*\

qpp.use("/user", rh1, rh2, [rh3,rh4, rh5])
// ====> multiple request handlers example here

//This will only handle GET call to/user
app.get("/user", (req,res) =>{
    res.send({firstName: "Pradeep", lastName: "Kumar"});
})

app.post("/user", (req,res) =>{
    // saving data to the DB.
    res.send("Data successfully saved to the database");
})

app.delete("/user", (req,res) =>{
    // deleting from the DB.
    res.send("Data deleted successfully.");
})

// This will match all the HTTP method(like get,post,delete) API calls to /test
app.use("/test", (req,res,next) =>{
    // let data = false;
    // if(data) {
        // res.send("Hello am listening from response page method..... :)");
        next();
    // }
},(req,res) =>{
    res.send("Am second response here.... Rockkkkk")
})

app.listen(3000, () =>{
    console.log("Server is listening on port 3000");
});