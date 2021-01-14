const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const messageSchema = mongoose.Schema({
    text:{
        type:String,
    },
    sendBy:{
        type:ObjectId,
        ref:'user'
    },
},
    {
    timestamps:{
        Type:Date,
        default:Date.now()
    }
}
);

// creating message model
mongoose.model('message',messageSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('message');