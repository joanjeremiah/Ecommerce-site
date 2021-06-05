import productModel from '../../../Models/Product';

export default (req,res) => {
    const {rating,headline,review,productId,name,image,email} = JSON.parse(req.body);
    // console.log(JSON.parse(req.body))
    productModel.findById({_id: productId})
    .then(doc => {
        console.log(doc)
        const reviewExist = doc.reviews.find(review => review.email == email)
        if(reviewExist){
            return res.status(400).json({msg: 'You already reviewed this product.',error: true})
        }
        productModel.findOneAndUpdate({_id: productId},{$push: {reviews: {
            rating,
            review,
            headline,
            name,
            image,
            email
        }}},(err,doc) => {
            if(err){
                console.log(err)
                return res.status(200).json({msg: 'There has been some error.Try again later.',error: true});
            }
            else{
                console.log(doc)
                return res.status(200).json({msg: 'Your review has been submitted',error: false});
            }
        })
    })
    
}
