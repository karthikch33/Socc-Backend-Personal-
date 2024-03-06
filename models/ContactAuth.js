import mongoose from "mongoose";
// Git Hub Url Updated
const ContactSchema = new mongoose.Schema({
    collegeId:{
        type:String
    },
    name:{
        type:String
    },  
    email:{
        type:String
    },
    message:{
        type:String
    },
    uniqueCode:{
        type:String,
    },
    resolvedMessage:{
        type:String,
        default:''
    },
    resolved:{
        type:Boolean,
        default:false
    },
    resolvedBy:{
        type:String,
        default:''
    }
})

const contact = mongoose.model('contact',ContactSchema)

export default contact