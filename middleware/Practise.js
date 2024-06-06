// cloudinary uploader 

const uploadthroughcloud = (req,res,next)=>{
    if(!req.files) next()
    const uploader = (path)=> cloudinaryUploadImg(path)

    const files = req.files
    const urls = []

    for(const file of files){
        const path = {file}
        const newpath = uploader(file)
        urls.push(newpath)
        fs.unlinkSync(path)
    }

    const images = urls.map((file)=>{return file})
    res.json(images)
}

const sendmailHi = (req,res,next)=>{
    const {data} = req.body
    const transporter = nodemailer.transporter({
        service:"gmail",
        auth:{
            user:"karthikch33",
            password:"karthik"
        }
    })
    const mailOptions = {
        from:"saipavan39dh",
        to:"londonmumbai123",
        subject:"Sending a Message HI",
        html:"<p>Hi</p>"
    }
    transporter.sendmail(mailOptions)
}

ProductA.methods.createPasswordToken = async function(data){
    const randomcode = crypto.randomBytes(256).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(randomcode).digest('hex')
    this.passwordExpiryDate = Date.now() + 90 * 1000
}

const passwordVerify = async (req,res)=>{
    const {token} = req.params
    if(!token) res.json(error)
    const hashedtoken = crypto.createHash('sha256').update(token).digest('hex')
    const countdo =await ProductA.countDocuments()
    const allempty = await ProductA.deleteMany({})
}