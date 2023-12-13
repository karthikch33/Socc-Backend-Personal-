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
    }
})

const Sessions = mongoose.model('Sessions',sessionSchema)

export default Sessions