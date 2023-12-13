import mongoose from "mongoose";

const DBconnect = ()=>{
    const uri =  process.env.MONGODB_URI
   try {
     const connect =  mongoose.connect(uri)
     return connect;
   } catch (error) {
     console.log('Database Authentication Refused');
   }
}

export default DBconnect;

