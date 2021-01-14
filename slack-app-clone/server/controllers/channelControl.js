const Channel = require('../models/channelmodel');


// checking the route

exports.default = (req,res)=>{
    Channel.find()
    return res.json({
        status:true,
        message:'route is working'
    });
}

// create a channell

exports.createChannel = async(req,res)=>{
    try{
        await Channel.findOne({channelName:req.body.channelName})  // checking if channel is already exist
        .exec((newChannel,existChannel)=>{
            if(existChannel){ // if exist
                return res.json({
                    message:'Channel already exist...'
                });
            }
          else{  // if not then create a new one
            req.user.password = undefined;     
            req.user.email = undefined;           // this will not display the emaila n password in createdBy
              Channel.create({
                  channelName:req.body.channelName,     // creating a new channel
                  description:req.body.description,
                  createdBy:req.user    // this will give the name who created the channel
              }, (error,result)=>{
                  if(!error){// if all ok
                      return res.json({
                          message:'Channel created successfully',
                          result
                      });
                  }
                  else{ // any error
                      return res.json({
                          message:'some error occurs',
                          error
                      });
                  }
              });
          }
      });
    }
    catch(err){
        return res.json('error'+err);
    }
}

// find and update any channel

exports.updateChannel = async(req,res)=>{
    try{
      await Channel.findOneAndUpdate({_id:req.body._id}, // finding by id
        {channelName:req.body.channelName, description:req.body.description},  // updating the channel
         (error,result)=>{
         if(!error){ // if all ok
             return res.json({
                 message:'updated successfully...',
                 result
             });
         }
         else{ // any error
             return res.json({
                 message:'not updated due to some error...',
                 error
             });
         }
      });
    }
    catch(err){
    return res.json('error' +err);
    }
}

// get all cahnnel
exports.findall = async(req,res)=>{
    try{
      await Channel.findall({}, (error,result)=>{
        if(error){ // any error
            return res.json({
                message:'Channel not found...'
            });
        }
        else{ // if all ok
            return res.json({
                message:'Channel found...',
                result
            });
        }
      });
    }
    catch(err){
res.json('error' +err);
    }
}

// finding the cahnnel 
 
exports.findChannel = async(req,res)=>{
    try{
    await Channel.findOne({channelName:req.params.channelName}, (error,result)=>{  // finding the channel by name
        if(error){ // any error
            return res.json({
                message:'Channel not found...'
            });
        }
        else{ // if all ok
            return res.json({
                message:'Channel found...',
                result
            });
        }
    });
    }
    catch(err){
     return res.json('error' +err);
    }
}

// to add the members in the channel

exports.addMembers = (req,res)=>{
    Channel.findByIdAndUpdate(req.body.channelId, {  // we will pass the id ofchannel
        $push:{channelMembers:req.user._id} // using push to add the members in the array
    }, {
        new:true  // so that we get the updated record
    }).exec((err,result)=>{
        if(err){        // executing the query
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    }) 
}