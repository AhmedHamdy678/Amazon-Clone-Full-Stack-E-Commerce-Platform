import React from 'react';
import './Checkout.css';
import CheckoutImg from "../images/checkoutAd.jpg";
import { useAuth } from '../context/GlobalState';
import ProductItem from './ProductItem';
import SubTotal from './SubTotal';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
    const { user ,basket } = useAuth();
    const navigate = useNavigate();

    return (
        <div className='checkout p-3 bg-white'>
            <div className='checkout-row'>
                <div className="row">
                    <div className="col-md-7 col-lg-9">
                        <img className='checkout-img img-fluid mb-4' src={CheckoutImg} alt="" />
                        <h4 className='fw-bold'>Hello,{user?.email}</h4>
                        <h4 className='fw-bold'>Your shopping Basket</h4>
                        {basket?.reduce((total, item) => total + item.quantity, 0) === 0 ? (
                            <p >
                                You have no items in your basket.
                                To buy one or more items,click"Add to basket".
                            </p>
                        ):(
                            <h4 className='fw-bold'> You have {basket?.reduce((total, item) => total + item.quantity, 0) || 0} items in your basket.</h4>
                        )}
                        <hr/>
                    </div>

                    <div className="col-md-5 col-lg-3">
                        <div className="checkout-summary p-3 ">
                            <div>Subtotal ({basket?.reduce((total, item) => total + item.quantity, 0) || 0} items): <strong><SubTotal/></strong></div>
                            <div>
                                <input type="checkbox" style={{cursor:'pointer'}}/>
                                <label className='ms-2'>This order contains a gift</label>
                            </div>
                            <button className="btn btn-warning w-100 mt-3" onClick={()=>{
                                navigate("/payment");
                            }}>Proceed to Buy</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='checkout-products'>
                {
                    basket?.map((item)=>{
                        return(
                            <ProductItem key={item.id} item={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
