import productModel from '../../Models/Product';

export default (req,res) => {
    const {term} = JSON.parse(req.body);
    var re = new RegExp(term, "gi");
    productModel.find({})
    .then(docs => {
        docs.forEach(doc => {
            for(var key in doc){
                if(re.test(doc[key])){
                    console.log(key)
                }
            }
        })
    })
}