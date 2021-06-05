import {useState,useRef} from 'react';
import dbConnect from '../middleware/dbconnect';
import productModel from '../Models/Product';
import Link from 'next/link';
import {useSession} from 'next-auth/client';
import Products from '../Components/Products';

export default function Home({productsProps}) {
  const products = JSON.parse(productsProps);
  const message = useRef(null);
  const [session,loading] = useSession();
  const [msg,setMsg] = useState('');
  const addToCart = async (e) => {
    if(!session){
      setMsg('You need to sign in first before you use cart.')
      message.current.style.transform = 'translateX(0)';
      setTimeout(() => {
        message.current.style.transform = 'translateX(100%)';
      },3000)
    }
    else{
      console.log(e.currentTarget.dataset)
      console.log(session.user)
      const response = await fetch('/api/cart/add',{
        method: 'POST',
        body: JSON.stringify({
          ...e.currentTarget.dataset,
          ...session.user
        })
      })
      const res = await response.json();
      if(res.msg){
        setMsg(res.msg)
        message.current.style.transform = 'translateX(0)';
        setTimeout(() => {
          message.current.style.transform = 'translateX(100%)';
        },3000)
      }
      
    }
    
  }
  console.log(session)
  // console.log(products)
  return (
    <>
      {products && <Products products={products} />}
    </>
  );
}

export const getServerSideProps = async () => {
  await dbConnect();
  const products = await productModel.find({})
  // console.log(products)
  return{
    props: {
      productsProps: JSON.stringify(products)
    }
  }
}
