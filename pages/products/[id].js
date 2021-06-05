import dbConnect from '../../middleware/dbconnect'
import productModel from '../../Models/Product';
import {useRef,useState,useEffect} from 'react';
import {useSession} from 'next-auth/client';

const ProductId = ({productProps}) => {
    const product = JSON.parse(productProps);
    console.log(product.reviews)
    const [session,loading] = useSession();
    const message = useRef(null);
    const radioButton1 = useRef(null);
    const radioButton2 = useRef(null);
    const radioButton3 = useRef(null);
    const radioButton4 = useRef(null);
    const radioButton5 = useRef(null);
    const radioButtonList = [radioButton1,radioButton2,radioButton3,radioButton4,radioButton5];
    const [reviewForm,setReviewForm] = useState({});
    const [productId,setProductId] = useState('');
    const [msg,setMsg] = useState(''); 
    const [reviews,setReviews] = useState([]); 

    useEffect(() => {
        setProductId(product._id)
    },[product])
    useEffect(() => {
        setReviews(product.reviews)
    },[])
    
    const onRadioClick = (e) => {
        radioButtonList.forEach(radioButton => {
            radioButton.current.style.background = 'white';
            radioButton.current.style.color = 'black'; 
        })
        radioButtonList[e.currentTarget.value - 1].current.style.background = '#008cffdb'; 
        radioButtonList[e.currentTarget.value - 1].current.style.color = 'white'; 
        setReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.value,
            productId
        })
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        if(session && session.user){
            console.log(1)
            const response = await fetch('/api/product/review',{
                method: 'POST',
                body: JSON.stringify({
                    ...reviewForm,
                    name: session.user.name,
                    image: session.user.image,
                    email: session.user.email
                })
            });
            const res = await response.json();
            if(res.msg){
                setMsg(res.msg)
                message.current.style.transform = 'translateX(0)';
                setTimeout(() => {
                    message.current.style.transform = 'translateX(100%)';
                },3000)
                if(!res.error){
                    setReviews([
                        ...reviews,
                        {
                            ...reviewForm,
                            name: session.user.name,
                            image: session.user.image,
                            email: session.user.email
                        }
                    ])
                }
                
            }
        }
        else{
            setMsg('You need to sign in first before you use cart.')
            message.current.style.transform = 'translateX(0)';
            setTimeout(() => {
                message.current.style.transform = 'translateX(100%)';
            },3000)
        }
    }
    const onInputChange = (e) => {
        setReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.value,
        })
        console.log(reviewForm)
    }
    const ratingUI = (rating) => {
        const GoldStar = () => {
            return(
                <svg height="18px" viewBox="0 -10 511.98685 511" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#ffc107"/></svg>
            );
        } 
        const Star = () => {
            return(
                <svg height="18px" viewBox="0 -10 511.98685 511" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#C0C0C0"/></svg>

            );
        }     
        var rows = [];
        for (var i = 0; i < rating; i++) {
            rows.push(<GoldStar key={i} />);
        }
        for (var i = 0; i < 5 - rating; i++) {
            rows.push(<Star key={i} />);
        }
        return <div style={{margin: '1vmin 0'}}>{rows}</div>
    }
    return(
        <div style={{padding: '4vmin 10vmin'}}>
            <p ref={message} className="message">{msg}</p>
            <div className="product-box">
                <img src={`../${product.image}`} alt="" />
                <div className="details">
                    <div className="flex title-price">
                        <span>{product.name}</span>
                        <span>&#8377;{product.price}</span>
                    </div>
                    <div className="flex qty-btn">
                        <span>Quantity: {product.qty}</span>
                        <button >Add to cart</button>
                    </div>
                    <p style={{fontFamily: 'sans-serif',fontSize: '1.2rem',fontWeight: '400',marginBottom:'2vmin'}}>Description</p>
                    <p>{product.description}</p>
                </div>  
            </div>
            {reviews && <div className="reviews">
                <h1 style={{fontFamily: 'sans-serif',fontSize:'1.3rem',margin: '3vmin 0'}}>Reviews</h1>
                {reviews.map(review => {
                    return(
                        <div className="review">
                            {/* <Image src={review.image} alt="Picture of the author"width={500} height={500} /> */}
                            <img src={`${review.image}`} />
                            <div className="info">
                                <p style={{color: 'blue',marginBottom: '1vmin'}}>{review.name}</p>
                                {ratingUI(review.rating)}
                                <h3>{review.headline}</h3>
                                <p>{review.review}</p>    
                            </div>
                            
                        </div>
                    );
                })}
            </div>}
            

            <div className="review-form-container">
                <h1 className="title">Create review</h1>
                <form onSubmit={onFormSubmit} className="review-form">
                    <p>How will you rate the product? *</p>
                    <input onClick={onRadioClick} type="radio" id="1" value="1" name="rating" /> 
                    <input onClick={onRadioClick} type="radio" id="2" value="2" name="rating" /> 
                    <input onClick={onRadioClick} type="radio" id="3" value="3" name="rating" /> 
                    <input onClick={onRadioClick} type="radio" id="4" value="4" name="rating" /> 
                    <input onClick={onRadioClick} type="radio" id="5" value="5" name="rating" />                                 <label ref={radioButton1} className="radio-label" htmlFor="1">1</label>
                    <label ref={radioButton2} className="radio-label" htmlFor="2">2</label>
                    <label ref={radioButton3} className="radio-label" htmlFor="3">3</label>
                    <label ref={radioButton4} className="radio-label" htmlFor="4">4</label>
                    <label ref={radioButton5} className="radio-label" htmlFor="5">5</label>  
                    <p>Add a headline</p>
                    <input onChange={onInputChange} name="headline" type="text" />
                    <p>Write your review</p>
                    <textarea onChange={onInputChange} name="review"></textarea>
                    <input type="submit" value="Submit your review" />
                </form> 
            </div>
        </div>
    );

}

export default ProductId;

export const getServerSideProps = async (context) => {
    await dbConnect();
    const product = await productModel.findById(context.query.id);

    return {
        props: {
            productProps: JSON.stringify(product)
        }
    }
}