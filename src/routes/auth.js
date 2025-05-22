const express = require('express');
const authRouter = express.Router();

const {validatesSignUpData} = require ("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');


// Creating mine first Post api call to save the data.
authRouter.post("/signup", async (req,res) =>{
      try{
        // validation of data 
        validatesSignUpData(req);
    
        // encrypt the password
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
    
        //  creating a new instance of the User model
        // const user = new User(req.body); ---> below is another way to send our hash password in db.    
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
    
        const savedUser = await user.save();

          // Create a JWT token
            const token = await savedUser.getJWT();    
            
          // Add the token to cookie and send the response back to the user.
          res.cookie("token", token, {
              expires: new Date(Date.now() + 8 * 3600000),
          });

        res.json({message: "User Added successfully!", data: savedUser});
      } catch(err) {
        res.status(400).send("Error  : " + err.message);
      }
})


// Creating login API tologin the user.
authRouter.post("/login", async (req,res) =>{   
      try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId : emailId});
    if(!user) {
        throw new Error ("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    
        if(isPasswordValid){

            // Create a JWT token
            const token = await user.getJWT();    
            
            // Add the token to cookie and send the response back to the user.
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
              });
            res.send(user);
        } else {
            throw new Error ("Invalid credentials");
        }
      } catch(err) {
        res.status(400).send("Error  : " + err.message);
      }
})

// Creating logout API to logout the user.
authRouter.post("/logout", async (req,res) =>{   

    // remove the token and expire the cookie right dere...send the response back to the user.
    res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      
    res.send("Logout Successfull @@@@!!!!");
})

module.exports = authRouter;