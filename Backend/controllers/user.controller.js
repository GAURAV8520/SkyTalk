import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'


import {User} from '../models/user.model.js'
import {Notification} from '../models/notification.model.js'


export const getUserProfile = async(req,res)=>{
    const {username} = req.params;

    console.log(username)


    try {
        const user = await User.findOne({username}).select("-password");
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        res.status(200).json(user);

    
    } catch (error) {
        console.log("Error in getUserProfile :", error.message);
        res.status(500).json({error:"error.message"})
       
    }
};

export const followUnfollowUser = async (req ,res)=>{
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id===req.user._id.toString()){
            return res.status(400).json({error:"you can not follow/unfollow yourself"})
        }

        if(!userToModify|| !currentUser){
            return res.status(400).json({error:"User not found"})
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            //unfollow the user
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});

            res.status(200).json({message:"User unfollowed successfully "})
        }
        else{
            //follow the user

            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}});


            //send the notification to user
            const newNotification = new Notification({
                type:"follow",
                from:req.user._id,
                to:userToModify._id,
            });

            await newNotification.save();

            res.status(200).json({message:"User followed successfully "})


        }

        
    } catch (error) {
        console.log("Error in getUserProfile :", error.message);
        res.status(500).json({error:error.message})
       
    }
};


export const getSuggestedUsers = async(req,res)=>{
    try {
        const userId= req.user._id;
        const userFollowedByme = await User.findById(userId).select("following")


        const users= await User.aggregate([
            {
                $match:{
                    _id:{$ne:userId}
                }
            },
            {$sample:{size:10}}
        ]);

        const filterUsers=users.filter((user)=>!userFollowedByme.following.includes(user._id));

        const suggestedUser=filterUsers.slice(0,4);

         suggestedUser.forEach((user)=>(user.password=null));

        res.status(200).json(suggestedUser);
    } catch (error) {
        console.log("Error in getsuggestedUsers :",error.message);
        res.status(500).json({error:error.message});
    };
};


export const updateUser=async (req,res)=>{

    const {fullName,email,username,currentPassword,newPassword,bio,link}=req.body;

    let {profileimg,coverimg}=req.body;

    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        
        if(!user){
            return res.status(404).json({message:"User not found"});

        }

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).json({error:"Please provide both current password and new password"});

        }

        if(currentPassword && newPassword){
            const isMatch =await bcrypt.compare(currentPassword,user.password);

            if(!isMatch){
                return res.status(400).json({message:"current password is incorrect"});

            }
            if(newPassword.length<6){
                return res.status(404).json({error:"Password must be at least 6 characters long"});

            }

            const salt = await bcrypt.genSalt(10);
            user.password= await bcrypt.hash(newPassword,salt);


        }

        if(profileimg){

            if(user.profileimg){
                await cloudinary.uploader.destroy(user.profileimg.split("/").pop().split(".")[0])
            }
            const uploadedResponse= await cloudinary.uploader.upload(profileimg)
            profileimg=uploadedResponse.secure_url;

        }
        if(coverimg){
            if(user.coverimg){
                await cloudinary.uploader.destroy(user.coverimg.split("/").pop().split(".")[0])
            }
            const uploadedResponse= await cloudinary.uploader.upload(coverimg)
            coverimg=uploadedResponse.secure_url;

        }


        user.fullName=fullName||user.fullName;
        user.email=email||user.email;
        user.username=username||user.username;
        user.bio=bio||user.bio;
        user.link=link||user.link;
        user.profileimg=profileimg||user.profileimg;
        user.coverimg=coverimg||user.coverimg;

        user=await user.save();

        //password should be null in response
        user.password=null;

        return res.status(200).json(user)
    } catch (error) {

       console.log("Error in updateUser:",error.message);
       res.status(500).json({error:error.message}) 
    }

}