import contact from "../models/ContactAuth.js"
import SessionRegistration from "../models/SessionRegistrationModel.js"
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import {sha256} from 'crypto-hash';
import Mailgen from "mailgen"
import AttendanceReg from "../models/AttendaceRegister.js"
import Sessions from "../models/SessionsModel.js";

export const registration = asyncHandler(async (req, res) => {
  try {
    const { registerid, EventReg } = req.body;

    const findFromAttendance = await AttendanceReg.findOne({
      'Attended': {
        $elemMatch: { 'EventReg': EventReg }
      }
    });

    if(findFromAttendance !== null) throw new Error('Session Attendance Submitted')
    
    const findSession = await Sessions.findOne({sessiontitle:EventReg})
    const findRegisterd = await SessionRegistration.findOne({ registerid, EventReg });

    if(findSession?.strength <= 0) throw new Error('Session Limit Exceeded')

  
    if (!findRegisterd && findSession?.strength > 0) {
      const newRegistration = await SessionRegistration.create(req.body);
      const updateSessionStrength = await Sessions.findOneAndUpdate(
        {
          sessiontitle:EventReg
        },
        {$inc:{strength:-1}}
      )
      sendEmailReg(req.body)
      res.json(newRegistration);
    } else {
      throw new Error('Registration Completed For this Id');
    }
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ status: 500, message: error.message });
  }
});


export const getAllRegister = asyncHandler(async(req,res)=>{
  const {sessiontitle} = req.body
  try {
    const registerData = await SessionRegistration.find({EventReg:sessiontitle?.sessiontitle})
    if (!registerData) {
      return res.status(404).json({ message: 'Session not found' });
  } 
  res.json(registerData);
  } catch (error) {
    throw new Error(error)
  }
})

export const attendaceRegister = asyncHandler(async (req, res) => {
  try {
    const { EventName } = req.body;
    const findFromAttendance = await AttendanceReg.findOne({
      'Attended': {
        $elemMatch: { 'EventReg': EventName }
      }
    });

    if (findFromAttendance === null) {
      const findRegisterd = await SessionRegistration.find({ EventReg: EventName });

      if (findRegisterd.length > 0) {
        res.json({ findRegisterd });
      } else {
        res.status(404).json({ status: 404, message: "Not Found" });
      }
    } else {
      res.json({ status: 306, message: "Attendance Submitted", findFromAttendance });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});


export const attendanceSave = asyncHandler(async (req, res) => {
  try {
    const AttendanceData = req.body;

    const filterArray = ['registerid', 'registername', 'EventReg', 'present', 'absent'];
    const removalData = AttendanceData.map(obj => {
      const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([key]) => filterArray.includes(key))
      );
      return filteredObj;
    });

    const attendanceResponse = await AttendanceReg.create({
      Attended: removalData,
      EventReg: removalData[0]?.EventReg
    });

    res.json({ attendanceResponse, status: 200 });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});


export const getCompliants = asyncHandler(async (req, res) => {
  try {
    const allCompliants = await contact.find({ resolved: false });  

    if (allCompliants) {
      res.json(allCompliants);
    } else {
      res.status(404).json({ status: 404, message: 'Complaints not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export const serveronoroff = asyncHandler(async(req,res)=>{
  try {
    res.json({status:201,message:'serverOn'})
  } catch (error) {
    res.json({status:404,message:'serverOff'})
  }
})

export const getCompliantsResolved = asyncHandler(async (req, res) => {
  try {
    const allCompliants = await contact.find({ resolved: true });  

    if (allCompliants) {
      res.json(allCompliants);
    } else {
      res.status(404).json({ status: 404, message: 'Complaints not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error?.message });
  }
});


export const resolvedContactMssg = asyncHandler(async (req, res) => {
  try {
    const { uniqueCode, resolvedMessage, resolvedBy } = req.body;
    const updateContactResolved = await contact.findOne({ uniqueCode });

    if (updateContactResolved) {
      const updateContact = await contact.findOneAndUpdate(
        { uniqueCode },
        {
          resolved: true,
          resolvedMessage: resolvedMessage,
          resolvedBy: resolvedBy,
        },
        { new: true }
      );

      sendEmailContactResolve(updateContact);
      res.json(updateContact);
    } else {
      res.status(404).json({ status: 404, message: 'Message Not Found' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});


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
        link: 'https://socc.vercel.app/',
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

export const sendEmailContactResolve = (data)=> {
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
        link: 'https://socc.vercel.app',
      },
    });
  
    let response = {
      body: {
        name: data?.name,
        intro: 'Socc Team Contact',
        outro: ` We Have a Resolution Mssg for Your Message 
            <br/>
            <br/>
        Message We Received : ${data?.message}
            <br/>
            <br/>
        Resolution Message  : ${data?.resolvedMessage}
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
        link: 'https://socc.vercel.app/',
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

