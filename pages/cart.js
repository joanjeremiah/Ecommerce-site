import { useSession, getSession } from "next-auth/client";
import Protected from '../Components/Protected';
import CartModel from '../Models/Cart';
import dbConnect from "../middleware/dbconnect";
import {useState} from 'react';

const Cart = ({cartProductsProps}) => {
    const [session,loading] = useSession();
    
    if(!session){
        return <Protected />
    }
    let totalPrice = 0
    // console.log(cartProductsProps)
    const cartProducts = JSON.parse(cartProductsProps);
    cartProducts.forEach(cartProduct => {
        console.log((cartProduct.price).replace('/regex/,',''))
        totalPrice +=  Number((cartProduct.price).replace(',',''));
    })
    // console.log(cartProductsProps)
    
    return(
        <div className="cart-products">
            <h1 className="title">My Cart</h1>
            {cartProducts && cartProducts.map(cartProduct => {
                return(
                    <div className="cart-product" key={cartProduct.id}>
                        <img src={cartProduct.image} />
                        <div>
                            <p className="name">{cartProduct.name}</p>
                            <p className="price">&#8377;{cartProduct.price}</p>
                        </div>
                        
                    </div>
                );
                
            })}
            <div className="cart-details">
                <p>Total cost: &#8377;{totalPrice}</p>
                <button className="pay">Proceed to pay</button>
            </div>
        </div>  
    );
}

export default Cart;

export const getServerSideProps = async (context) => {
    
    const session = await getSession(context);
    await dbConnect()
    if(session && session.user){
        const carts = await CartModel.findOne({email: session.user.email})
        return {
            props: {
                cartProductsProps: JSON.stringify(carts.products)
            }
        }
    }
    return{
        props: {
            cartProductsProps: ''
        }
    }
   
}