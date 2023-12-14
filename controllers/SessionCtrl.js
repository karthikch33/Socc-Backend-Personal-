import asyncHandler from 'express-async-handler'
import Sessions from '../models/SessionsModel.js'
import Feedback from '../models/FeedBack.js';
import AdminRegister from '../models/Register.js';
import { generateToken } from '../Config/Jwt_GenerateToken.js';

export const registration = asyncHandler(async (req, res) => {
    try {
        // uploads(req.files)
        console.log(req.body);
        const newRegistration = await Sessions.create(req.body);
        res.json(newRegistration);
    } catch (error) {
        res.status(500).json({ message: 'Session Registration Failed', error: error.message });
    }
});

export const getAllSessions = asyncHandler(async (req,res)=>{
    try {
        const allsessions = await Sessions.find()
        res.json(allsessions)
    } catch (error) {
        res.status(500).json({message:"Fetching Sessions Failed", error:error.message})
    }
})

export const getSessionById = asyncHandler(async (req,res)=>{
    const {id} = req.params
    try {
        const singleSession = await Sessions.findById(id);
        if(singleSession)
        {
            res.json(singleSession)
        }
        else{
            res.json({message:'Invalid Id. Session Not Fetched'})
        }
    } catch (error) {
        res.status(500).json({message:"Session Fetching Failed",error:error?.message})
    }
})

export const feedbackRating = asyncHandler(async(req,res)=>{
    try {
        console.log("hi");
        const feedback = await Feedback.create(req.body)
        if(feedback)
        {
            res.json(feedback)
        }
        else
        {
            res.json({error:"Error In Submission FeedBack"})
        }
    } catch (error) {
        res.status(500).json({message:"Rating Submission Failed",error:error?.message})
    }
})

export const uploads = async(filesData)=>{
    const files = filesData
    console.log(files);
  
    if(!files)
    {
      const error = new Error('Please Choose Files')
      error.httpStatusCode = 400
      return next(error)
    }
  
    res.json(files)
  }

export const adminRegister = asyncHandler(async (req,res)=>{
    const {username,email,phone} = req.body
    try {
        const findEmail = await AdminRegister.findOne({email})
        if(findEmail) res.json({status:409,message:"Email Already Taken"})
        const findPhone = await AdminRegister.findOne({phone})
        if(findPhone) res.json({status:409,message:"Phone Number Already Taken"})
        const findUsername = await AdminRegister.findOne({username})
        if(findUsername) res.json({status:409,message:'Username Already Taken'})

        const createAdminUser = await AdminRegister.create(req.body)
        if(createAdminUser) res.json({status:201,message:"Admin User Created "})
        else res.json({status:500,message:'User Creation Fails'})
    } catch (error) {
        res.json({status:500,message:'User Creation Fails'})
    }
})

export const adminLogin = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {username,password} = req.body
    try {
        const adminLogin = await AdminRegister.findOne({username})
        if(!adminLogin) res.json({status:305,message:"Admin User Not Found"})
        if(adminLogin && await adminLogin.isPasswordMatched(password))
        {
            const refreshToken =await generateToken(adminLogin?._id)
            const updateAdminUser =await AdminRegister.findByIdAndUpdate(adminLogin?._id,{
                refreshedToken:refreshToken
            },{new:true}) 
            res.json({
                _id:adminLogin?._id,
                firstname:adminLogin?.firstname,
                lastname:adminLogin?.lastname,
                email:adminLogin?.email,
                username:adminLogin?.username,
                phone:adminLogin?.phone,
                refreshedToken:updateAdminUser?.refreshedToken,
                status:201
            })
        }
        else{
            res.json({status:404,message:"Password Not Matched"})
        }
    } catch (error) {
        res.json({status:500,error:error,message:'Invalid Credentials'})
    }
})

