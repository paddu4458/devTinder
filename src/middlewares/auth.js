// ====> multiple request handlers example here Adding middleware code here as per below example
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting checked!!!")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("unauthorized request");
    } else {
        next();
    }
};

const userAuth = async (req,res,next) => {
try {
     // Read the token from the req cookies.
 const {token} = req.cookies;

 if(!token) {
    throw new Error("Token is not valid");
 }
 const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
 // validate the token

 const {_id} = decodedObj;
 
 // find the user
 const user = await User.findById(_id);

 if(!user) {
    throw new Error("User not found");
 }

 req.user = user;
 next(); 
} catch(err) {
    res.status(400).send("Error : " + err.message);
}
};

module.exports = {
    adminAuth,userAuth
}

