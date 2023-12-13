import mongoose from "mongoose";

const FeedBackSchema = new mongoose.Schema({
    course_content:{
        type:String
    },
    teaching_methods:{
        type:String
    },
    feedback_communication:{
        type:String
    },
    overall_satisfaction:{
        type:String
    },
    session_title:{
        type:String
    }

})

const Feedback = mongoose.model('Feedback',FeedBackSchema)

export default Feedback