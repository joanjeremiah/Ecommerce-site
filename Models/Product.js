import mongoose from 'mongoose';

const review = mongoose.Schema({
    review: String,
    headline: String,
    rating: Number,
    name: String,
    image: String,
    email: String
})

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    price: String,
    image: String,
    description: String,
    qty: Number,
    reviews: [review]
})

const productModel = mongoose.models.products || mongoose.model('products',productSchema);

export default productModel;