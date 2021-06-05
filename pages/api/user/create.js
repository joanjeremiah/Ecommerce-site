import multer from 'multer';
import path from 'path'
import dbConnect from '../../../middleware/dbconnect';
import UserModel from '../../../Models/User';
import bcrypt from 'bcrypt';

//dashboard roles admin|vendor|customer admin authorizes vendor.vendor has access to dashbord
//responsive
//sections
//firebase

const checkFileType = (file,cb) => {
    console.log(file)
    const fileTypes = /jpg|jpeg|png|gif/;
    const check = fileTypes.test(file.mimetype)
    if(check){
        return cb(null,true)
    }
    return cb({msg: 'Images only'})
}

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req,file,cb) => { 
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    fileFilter: (req,file,cb) => {
        checkFileType(file,cb)
    }
}).single('profile')

export default (req,res) => {
    upload(req,res,async (err) => {
        if(err){
            console.log(err)
            res.status(500).json({msg: err.msg})
        }
        if(req.file){
            await dbConnect();
            const details = JSON.parse(req.body.details);
            const password = await bcrypt.hash(details.password,8);
            const doc = await UserModel.findOne({email: details.email})
            if(doc){
                return res.status(400).json({msg: 'Email is already registerd'})
            }
            const newUser = new UserModel({
                ...details,
                image:  `/uploads/${req.file.filename}`,
                password
            })
            const user = await newUser.save()
            res.status(200).json({msg: 'User is successfully registered'})
        } 
    })
    
}

export const config = {
    api: {
        bodyParser: false
    }
    
}