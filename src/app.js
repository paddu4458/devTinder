const express = require('express');

const app = express();

// Below is the route handler creating..
// Order of the routes matter lot*

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

// This will match all the HTTP method API calls to /test
app.use("/test", (req,res) =>{
    res.send("Hello am listening from response page method..... :)")
})

app.listen(3000, () =>{
    console.log("Server is listening on port 3000");
});