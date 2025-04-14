const express = require('express');
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");
app.use(express.json());
// const { adminAuth, userAuth } = require("./middlewares/auth");

// Below is the route handler creating..
// Order of the routes matter lot*\

// qpp.use("/user", rh1, rh2, [rh3,rh4, rh5])
// ====> multiple request handlers example here

//Handle Auth Middlewares for all the Get,POST,.... requests
// app.use("/admin", adminAuth); 



//This will only handle GET call to/user
// app.get("/getAllData", (req,res) =>{
//     // console.log("get all data method!!!")
//     throw new Error("sdsdsd")
//     res.send("Data successfully saved to the database for get data");
// })

// app.get("/user", userAuth , (req,res) =>{
//     // saving data to the DB.
//     res.send("Data successfully saved to the database");
// })

// Below is the route handler creating..
// Order of the routes matter lot*\

// qpp.use("/user", rh1, rh2, [rh3,rh4, rh5])
// ====> multiple request handlers example here

//This will only handle GET call to/user
// app.get("/user", (req,res) =>{
//     res.send({firstName: "Pradeep", lastName: "Kumar"});
// })

// app.post("/user", (req,res) =>{
//     // saving data to the DB.
//     res.send("Data successfully saved to the database");
// })

// app.delete("/user", (req,res) =>{
//     // deleting from the DB.
//     res.send("Data deleted successfully.");
// })



// This will match all the HTTP method(like get,post,delete) API calls to /test
// app.use("/test", (req,res,next) =>{
//     // let data = false;
//     // if(data) {
//         // res.send("Hello am listening from response page method..... :)");
//         next();
//     // }
// },(req,res) =>{
//     res.send("Am second response here.... Rockkkkk")
// })


// app.use("/", (err,req,res,next) => {
//     if(err){
//         res.status(500).send("Some thing went wrong");
//     }
// })


// Creating mine first Post api call to save the data
app.post("/signup", async (req,res) =>{
    const user = new User(req.body);
//  creating a new instance of the User model
//     const user = new User({
//         firstName: "Viratdsssssssss",
//         lastName: "Kohli",
//         emailId: "virat123@gmail.com",
//         password: "pradeep@188888823"
//     });

  try{
    await user.save();
    res.send("User added successfully.....!!!")
  } catch(err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
})


app.get("/user", async (req,res) =>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
        res.send(user);
    }
    catch(err) {
        res.status(400).send("something went wrong....")
    }
})


connectDB()
.then(() =>{
    console.log("Database connection established....");
    app.listen(3000, () =>{
        console.log("Server is listening on port 3000");
    });
}).catch(err =>{
    console.log("Database can not be connected....");
})

