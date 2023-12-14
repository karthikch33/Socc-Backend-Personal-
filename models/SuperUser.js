import mongoose from 'mongoose'


const superUserSchema = new mongoose.Schema({
    token:{
        type:String
    }
},{timestamps:true})

const superUser = mongoose.model('superuser',superUserSchema)

export default superUser