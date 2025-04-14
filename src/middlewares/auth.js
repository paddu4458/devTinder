// ====> multiple request handlers example here Adding middleware code here as per below example

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

const userAuth = (req,res,next) =>{
    console.log("User is getting authentication check !!!")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("User request not authorized");
    } else {
        next();
    }
};

module.exports = {
    adminAuth,userAuth
}

