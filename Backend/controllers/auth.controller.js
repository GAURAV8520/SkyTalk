import {User} from '../models/user.model.js'


export const signup =async (req,res)=>{
    try{
        const {fullName ,username,email,password}=req.body;

        const emilRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if(!emilRegex.test(email)){
            return res.status(400).json({error:"Invalid email format "})
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
    res.json({
       data:"you hit the login endpoint" 
    });
}


export const logout =async (req,res)=>{
    res.json({
       data:"you hit the logout endpoint" 
    });
}