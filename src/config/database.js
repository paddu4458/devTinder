const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect (
    "mongodb+srv://pradeep4458:Amazon%4012345@namastenode.ex2koex.mongodb.net/devTinder"
    );
};

module.exports = connectDB;