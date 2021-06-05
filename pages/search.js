import productModel from '../Models/Product';
import Products from '../Components/Products';

const Search = ({productsProps}) => {
    const products = JSON.parse(productsProps);
    return(<Products products={products} />);
}

export default Search;

export const getServerSideProps = async (context) => {
    const term = context.query.t;  
    let re = new RegExp(term, "gi");
    const docs = await productModel.find({});
    let products = [];
    docs.forEach(doc => {
        for(var key in doc){
            if(re.test(doc[key])){
                console.log(key)
                products.push(doc);
                break;
            }
        }
    })
    console.log(products)
    return {
        props: {
            productsProps: JSON.stringify(products)
        }
    }
    
}