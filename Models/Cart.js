import mongoose from 'mongoose';

const CartProductSchema = mongoose.Schema({
    name: String,
    image: String,
    price: String,
    id: String
})

const CartSchema = mongoose.Schema({
    name: String,
    email: String,
    type: String,
    image: String,
    products: [CartProductSchema]
})

mongoose.models = {};

const CartModel = mongoose.model('carts',CartSchema)

export default CartModel;