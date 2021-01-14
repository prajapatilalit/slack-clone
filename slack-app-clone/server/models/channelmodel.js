const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const channelSchema = mongoose.Schema({
    channelName:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    channelMembers:[
        {
                type:ObjectId,
                ref:'user',
                unique:true
            
        }
    ],
    createdBy:{
        type:ObjectId,
        ref:'user'
    }
});

// creating channel model
mongoose.model('channel',channelSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('channel');