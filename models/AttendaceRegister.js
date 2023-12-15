import mongoose from "mongoose";

const AttendanceReg = new mongoose.Schema({
    Attended:[
        {
            EventReg:{
                type:String
            },
            registerid:{
                type:String
            },
            registername:{
                type:String
            },
            absent:{
                type:Boolean,
                default:false
            }
        }
    ],
    EventReg:{
        type:String
    }
})

const Attendance = mongoose.model('attendance',AttendanceReg)
export default Attendance