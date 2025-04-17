const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");


profileRouter.get("/profile/view", userAuth,  async (req,res) => {
    try {    
        const user = req.user;
        res.send(user);
    } catch(err) {
        res.status(400).send("some thing went wrong here....!!!")
    }    
  }
);

profileRouter.patch("/profile/edit", userAuth, async(req,res) => {
    try{
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid edit request") ;
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.send({ Message : `${loggedInUser.firstName}, Your profile updated successfully !!`,
        data: loggedInUser
     });
    } catch {
        res.status(400).send("some thing went wrong here....!!!")
    }
});

// profileRouter.patch("/profile/password", userAuth, async(req,res) => {
//     try{
//         const {password} = req.body.password;
//         const isPasswordValid = await user.validatePassword(password);
//         const passwordHash = await bcrypt.hash(password, 10);
//         console.log("Password here..." + isPasswordValid + password);

//         if (isPasswordValid) {
//             const user = new User({
//                 password: passwordHash,
//             });
        
//             await user.save();
//             res.send("Password updated successfully.....!!!");

//         } else {
//             throw new Error ("Invalid password");
//         }
//     } catch {
//         res.status(400).send("Some thing went wrong here....!!!")
//     }
// });

module.exports = profileRouter;