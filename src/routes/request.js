const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const { userAuth } = require("../middlewares/auth");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res) =>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({ message: "Invalid status type: " + status})
        }

        const toUser = await User.findById(toUserId);

        if(!toUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // If there is an existing connectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
           $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId : fromUserId },
           ],           
        });

        if(existingConnectionRequest) {
            return res
            .status(400)
            .send({ message: "Connection request already exists !!"});
        }


        const conectionRequest = new ConnectionRequest ({
            fromUserId,
            toUserId,
            status,
        });

        const data = await conectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        });  
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) =>{
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({message : "status not allowed !"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            
        })


    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }

})

module.exports = requestRouter;