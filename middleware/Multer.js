// import multer from 'multer'


// //set Storage

// var storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'uploads')
//     },
//     filename:function(req,file,cb){
//         // image.jpg returns .jpg
//         var ext = file?.originalname.substr(file.originalname.lastIndexOf('.'))
//         cb(null,file.filename+'-'+Date.now()+ext)
//     }
// })

// store = multer({
//     storage:storage
// })

// export default store