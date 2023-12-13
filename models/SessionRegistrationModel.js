import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    registerid:{
        type:String
    },
    registername:{
        type:String
    },
    year:{
        type:Number
    },
    venue:{
        type:String
    },
    date:{
        type:String
    },
    StartsAt:{
        type:String
    },
    Ends:{
        type:String
    },
    EventReg:{
        type:String
    },
    present:{
        type:String
    },
    absent:{
        type:String
    }
},{timestamps:true});

const SessionRegistration = mongoose.model('Registration', registerSchema);

export default SessionRegistration;
