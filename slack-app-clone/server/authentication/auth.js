const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.json({
            message:'you must be logged in...'
        });
    }
    const token =  authorization.replace('Bearer', '')
    jwt.verify(token, 'verySecretValue', (error,payload)=>{
        if(error){
            return res.json({
                message:'you must be logged in...'
            });
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next();
        })
    })
}