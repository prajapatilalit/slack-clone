const Profile = require('../models/profilemodel');


// default route

exports.default = (req,res)=>{
    Profile.find()
    return res.json({
        status:true,
        message:'route is working'
    });
}

// to upload your profile
exports.uploadProfile = async(req,res)=>{
    try{
        req.user.password = undefined;
        await Profile.findById({_id:req.body._id},(exist,notExist)=>{
            if(exist){
                return res.json({
                    message:'already uploaded',
                    exist
                })
            }
            else{
       Profile.create({
      userProfession:req.body.userProfession,
      contactNumber:req.body.contactNumber,
      userInfo:req.user
  },(error,result)=>{
      if(!error){
          return res.json({
              message:'Profile uploaded...',
              result
          });
      }
      else{
          return res.json({
              message:'Profile not uploaded...',
              error
          });
      }
  });
}
    });
}
    catch(err){
      return res.json('error' +err);
    }
}

// to view your own profile

exports.viewProfile = async(req,res)=>{
    try{
     await Profile.findOne((error,result)=>{
         if(!error){
             return res.json(result);
         }
         else{
             return res.json(error);
         }
     });
    }
    catch(err){
    return res.json('error' +err);
    }
}

// to view other  user profile

exports.viewOther = async(req,res)=>{
    try{
     await Profile.findById({_id:req.user._id}, (error,result)=>{
         if(!error){
             return res.json(result);
         }
         else{
             return res.json(error);
         }
     });
    }
    catch(err){
    return res.json('error' +err);
    }
}