import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {generateTokenAndSetCookie} from '../lib/utils/generateTokenAndSetCookie.js'


export const signup =async (req,res)=>{
    try{
        const {fullName ,username,email,password}=req.body;

       // More robust email validation regex

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        //console.log("Email regex test failed");
        return res.status(400).json({ error: 'Invalid email format' });
        }


        const existingUser =await User.findOne({username});
        if(existingUser){
          return res.status(400).json({error:"userName is already taken"})  
        }

        const existingemail =await User.findOne({email});
        if(existingemail){
          return res.status(400).json({error:"email is already taken"})  
        }

        //hash password 
        if(password.length<8){
            return res.status(400).json({error:"password must be atleast 8 charachter"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                followers:newUser.followers,
                following:newUser.following,
                profileimg:newUser.profileimg,
                coverimg:newUser.coverimg,
            })
        }else{

            res.status(400).jaon({error:"Invalid user data"})

        }

        
    }catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const login =async (req,res)=>{

   try {
     const {username,password}=req.body;
 
     const user=await User.findOne({username});
     const ispasswordCorrect= await bcrypt.compare(password,user?.password || "");
     
     if(!(user&& ispasswordCorrect)){
         return res.status(400).json({error:"Invalid username or password"})
     }
 
     generateTokenAndSetCookie(user._id,res);
 
     res.status(200).json({
         _id:user._id,
         username:user.username,
         email:user.email,
         followers:user.followers,
         following:user.following,
         profileimg:user.profileimg,
         coverimg:user.coverimg,
     })
   } catch (error) {
      console.log("Error in login controller",error.message);
      res.status(500).json({error:"Internal server error"})
   }

    


}

export const logout =async (req,res)=>{
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logged out successfully"})
   } catch (error) {
    console.log("Error in logout controller",error.message);
    res.status(500).json({error:"Internal server error"});
   }
}

export const getMe = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);

    } catch (error) {
        console.log("Error in getMe controller ",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}