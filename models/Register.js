import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const RegisterSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    firstname:{
        type:String,
        default:'Socc'
    },
    lastname:{
        type:String,
        default:"Personel"
    },
    email:{
        type:String,
        unique:true
    },
    gender:{
        type:String,
        default:'male'
    },
    phone:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    refreshedToken:{
        type:String,
        default:''
    },
    role:{
        type:String,
        default:'admin'
    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:Date,
    },
    oneTimeOTP:{
        type:Number,
        default:""
    }
},{timestamps:true})

RegisterSchema.pre('save',async function(next){
    if(!this.isModified('password')) {next()}
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

RegisterSchema.methods.createPasswordResetToken = async function(token){
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000  // 30 minutes
    this.oneTimeOTP = token
    return resetToken
}

RegisterSchema.methods.isPasswordMatched = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
}


const AdminRegister = mongoose.model('AdminRegister',RegisterSchema)

export default AdminRegister