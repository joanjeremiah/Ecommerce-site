import CartModel from '../../../Models/Cart';

export default (req,res) => {
    const {productname,productid,productprice,productimage,name,email,image} = JSON.parse(req.body)
    CartModel.findOne({email: email})
    .then(doc => {
        // console.log(doc)
        if(!doc){
            const newCart = new CartModel({
                name,
                email,
                image,
                products: [{
                    name: productname,
                    id: productid,
                    price: productprice,
                    image: productimage
                }]
            })
            newCart.save();
            return res.status(200).json({msg: 'The item has been added to your cart'});
        }
        else{
            CartModel.findOneAndUpdate({email: email},{$push: {products: {
                name: productname,
                id: productid,
                price: productprice,
                image: productimage
            }}},(err,doc) => {
                if(err){
                    // console.log(1)
                    console.log(err)
                }
                else{
                    // console.log('suc')
                    console.log(doc)
                    return res.status(200).json({msg: 'The item has been added to your cart'});
                }
            })
           
        }
        
    })
}