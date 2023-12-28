import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    sessiontitle:{
        type:String
    },
    date:{
        type:String
    },
    venue:{
        type:String
    },
    startAt:{
        type:String
    },
    ends:{
        type:String
    },
    images:{
        type:String
    },
    outcomes:{
        type:String
    },
    silincrease:{
        type:Number
    },
    sildecrease:{
        type:Number
    },
    instructor:{
        type:String
    },
    manager:{
        type:String
    },
    strength:{
        type:Number
    }
})

const Sessions = mongoose.model('Sessions',sessionSchema)

export default Sessions