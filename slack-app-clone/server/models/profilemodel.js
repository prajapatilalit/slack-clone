const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const profileSchema = new mongoose.Schema({
    profilePicture:{
        type:String,
    },
    userProfession:{
        type:String,
    },
    contactNumber:{
        type:Number,
    },
    userInfo:{
        type:ObjectId,
        ref:'user'
    }
});

// creating profile model
mongoose.model('profile',profileSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('profile');