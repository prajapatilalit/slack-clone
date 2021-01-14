const e = require('express');
const Message = require('../models/messagemodel');


// checking the route

exports.default = (req,res)=>{
    Message.find()
    return res.json({
        status:true,
        message:'route is working'
    });
}

// create a message

exports.createMessage = async(req,res)=>{
    try{
        req.user.password = undefined;
        req.user.email = undefined;
      await Message.create({
          text:req.body.text,  // creating a message
          sendBy:req.user   // it will display the name who send the message
      }, (error,result)=>{
          if(!error){//if all ok
              return res.json({result});
          }
          else{ // any error
              return res.json({error});
          }
      });
    }
    catch(err){
   return res.json('error' +err);
    }
}

// updating a message

exports.updateMessage = async(req,res)=>{
    try{ // quering the message by its id
    await Message.updateOne({_id:req.body._id}, {text:req.body.text},(error,result)=>{
        if(!error){// if all ok update the message
            return res.json({
                message:'updated...',
                result
            });
        }
        else{// anny error 
            return res.json({
                message:'failed to update...',
                error
            });
        }
    })
    }
    catch(err){
    return res.json('error' +err);
    }
}

// deleting a message

exports.deleteMessage = async(req,res)=>{
    try{   // quering by id
   await Message.deleteOne({_id:req.body._id}, (error,result)=>{
       if(!error){// if all ok delete the message
           return res.json({
               message:'message deleted successfully...',
               result
           });
       }
       else{// any error 
           return res.json({
               message:'failed to delte the message...',
               error
           });
       }
   })
    }
    catch(err){
    return res.json('error' +err);
    }
}