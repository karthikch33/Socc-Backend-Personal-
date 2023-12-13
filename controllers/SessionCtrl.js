import asyncHandler from 'express-async-handler'
import Sessions from '../models/SessionsModel.js'
import feedback from '../models/FeedBack.js';
import Feedback from '../models/FeedBack.js';

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