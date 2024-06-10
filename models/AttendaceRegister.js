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



/* 

    const something =  new mongoose.Schema({
        attendend:[
            {
                eventreg:{
                    type:String
                },
                registerid:{
                    type:String,
                    default:"210000000"
                },
                registername:{
                    type:String
                }
            }
        ],
        eventreg:{
            type:String,
            default:"Someting"
        },
        date:{
            type:Date,
            default:"January"
        },
        address:[
            {
                city:{
                    type:String,
                    default:"Hmdc"
                },
                street:{
                    type:String,
                    default:"hkd"
                },
                mandal:{
                    type:String,
                    default:"vmc"
                },
                houseno:{
                    type:String
                },
                mobile:[
                    {
                        phone:Number
                    }
                ]
            }
        ]
    })

    const findOneEvent = await Attendance.findOne({
        'Attended':{
            $eleMatch:{
                'EventName':"Introduction to upi"
            }
        }
        })
*/

const Attendance = mongoose.model('attendance',AttendanceReg)
export default Attendance