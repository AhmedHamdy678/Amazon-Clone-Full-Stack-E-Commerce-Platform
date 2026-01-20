import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '../context/GlobalState';

export default function ProductItem({item , hiddenQuantity , hiddenButton}) {
    const {dispatch} = useAuth();

    return (
        <div key={item.id} className='product-item d-flex align-items-center gap-3 mb-5'>
            <div>
                <img className="product-item-img img-fluid" src={item.img} alt="" width={160}/>
                {
                    !hiddenQuantity && (
                        <div className="product-quantity d-flex justify-content-center align-items-center gap-2 mt-2">
                            <button className='quantity-btn' onClick={()=>{
                                dispatch({type:"DECREASE_QUANTITY" , idPayload: item.id})
                            }}>-</button>

                            <span>{item.quantity}</span>

                            <button className='quantity-btn' onClick={()=>{
                                dispatch({type:"INCREASE_QUANTITY" , idPayload: item.id})
                            }}>+</button>
                        </div>
                    )
                }
            </div>
            <div className="product-info" style={{maxWidth:"600px"}}>
                <p style={{fontSize:"16px"}} className="fw-bold">{item.title}</p>
                <h5 className='fw-bold'>${item.price}</h5>
                <div className="product-rating">
                    {Array(item.rating).fill().map((_, i) => (
                        <StarIcon key={i} style={{ color: '#f0c14b' }} />
                    ))}
                </div>
                {!hiddenButton && <button className='product-btn mt-3' onClick={()=>{
                    dispatch({type:"REMOVE_FROM_BASKET" , idPayload: item.id})
                }}>Remove from Basket</button>}
            </div>
        </div>
    )
}
