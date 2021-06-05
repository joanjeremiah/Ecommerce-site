import multer from 'multer';
import path from 'path'
import dbConnect from '../../../middleware/dbconnect';
import productModel from '../../../Models/Product';
import {default as fsWithCallbacks} from 'fs'
const fs = fsWithCallbacks.promises

const checkFileType = (file,cb) => {
    console.log(file)
    const fileTypes = /jpg|jpeg|png|gif|webp/;
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
}).single('product')

export default (req,res) => {
    upload(req,res,async (err) => {
        if(err){
            console.log(err)
            res.status(500).json({msg: err.msg})
        }
        if(req.file){
            await dbConnect();

            const details = JSON.parse(req.body.details);
            const newProduct = new productModel({...details,image: `uploads/${req.file.filename}`})
            newProduct.save()
            .then(d => {
                console.log(d);
                return res.json({msg: 'The product has been successfully added.'})
            })
        } 
    })
    
}

export const config = {
    api: {
        bodyParser: false
    }   
}