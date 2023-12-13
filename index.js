import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv/config'
// import cookieParser from 'cookie-parser'
import router1 from './routes/auth.js'
import path from 'path'
import router2 from './routes/adminRoute.js'
import DBconnect from './Database/dbConnect.js'
import hbs from 'express-handlebars'
import { errorHandler, notFound } from './Config/ErrorHandler.js'


const app = express()
const PORT = process.env.PORT || 4036
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// app.use(express.static(path.join(__dirname,"public")))
// app.set("view Engine","hbs")

// app.engine('hbs',hbs({
//     extname:'hbs',
//     defaultView:'default',
//     layoutsDir: path.join(__dirname,'views'),
//     partialsDir:path.join(__dirname,'views/partials')
// }))

app.use('/api/auth',router1)
app.use('/api/admin',router2)

app.use(notFound)
app.use(errorHandler)
DBconnect()
.then(()=>{
    console.log('Database Connection Successfull');
    app.listen(PORT,()=>{
        if(PORT === 4036) { 
            console.log(`Server Started on ${PORT}`);
        } 
        else{
            console.log(`Server Started on Existing PORT`);
        }
    })
})
.catch(()=>{
    console.log('Server Not Responded');
})
