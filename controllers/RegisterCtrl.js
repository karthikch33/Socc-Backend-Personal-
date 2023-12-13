import contact from "../models/ContactAuth.js"
import SessionRegistration from "../models/SessionRegistrationModel.js"
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import Mailgen from "mailgen"

export const registration =asyncHandler(async (req,res)=>{
    const {registerid,EventReg} = req.body
        const findRegisterd =await SessionRegistration.findOne({registerid:registerid,EventReg:EventReg})
        if(!findRegisterd)
        {
            const newRegistration =await SessionRegistration.create(req.body)
            sendEmailReg(req.body)
            res.json(newRegistration)
        }
        else
        {
            throw new Error('Registration Completed For this Id')
        }
})


export const contactfun = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const feedbackSave = await contact.create(req.body)
    if(feedbackSave)
    {
        sendEmail(req.body)
        res.json({message:'FeedBack Submmitted',
                     success:true})
    }
    else{
        res.json({message:'FeedBack Failed',
                    success:false})
    }
})


export const sendEmail = (data)=> {
    let config = {
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD, 
      },
    };
  
    let transporter = nodemailer.createTransport(config);
  
    let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Socc Official',
        link: 'https://mailgen.js',
      },
    });
  
    let response = {
      body: {
        name: data?.name,
        intro: 'Socc Team Contact',
        outro: `We Have Received Your FeedBack And We Will Let You Notify When it is Solved 
            <br/>
            <br/>
        Message We Received : ${data?.message}
        `,
      },    
    };
  
    let mail = MailGenerator.generate(response);
  
    let message = {
      from: process.env.MAIL_ID,
      to: data?.email,
      subject: 'Socc Team Contact', 
      html: mail,
    };
  
    transporter.sendMail(message)
      .then(() => {
       console.log('You Should Recieve An Email');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export const sendEmailReg = (data)=> {
    let config = {
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD, 
      },
    };
  
    let transporter = nodemailer.createTransport(config);

  
    let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Socc Official',
        link: 'https://mailgen.js',
      },
    });
  
    let response = {
      body: {
        name: data?.registerid,
        intro: 'Session Registration',
        outro: `You are receiving this mail just to inform you about your recent Session Registration for ${data?.EventReg}
        <br/>
        <br/>
        Date: ${data?.date}
        <br/>
        Timing: ${data?.startAt}
        <br/>
        Venue: ${data?.venue}
        <br/>
        Current Date: ${new Date()}
        <br/>
        `,
      },    
    };
  
    let mail = MailGenerator.generate(response);
  
    let message = {
      from: process.env.MAIL_ID,
      to: `${data?.registerid+"@kluniversity.in"}`,
      subject: 'Session Registration', 
      html: mail,
    };
  
    transporter.sendMail(message)
      .then(() => {
       console.log('You Should Recieve An Email');
      })
      .catch((error) => {
        console.log(error);
      });
  };

