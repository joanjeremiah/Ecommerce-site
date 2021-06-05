import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    type: String,
    image: String,
    password: String
})

const UserModel = mongoose.models.User || mongoose.model('User',UserSchema)

export default UserModel;