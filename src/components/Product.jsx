import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '../context/GlobalState';

export default function Product({id, col , title , price , img , rating}) {
    const { dispatch } = useAuth();
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            itemPayload: {
                id: id,
                title: title,
                price: price,
                img: img,
                rating: rating,
            },
        });
    }

    return (
        <div id={id} className={`product ${col} mb-4`}>
            <div className="product-info h-100 bg-white p-3">
                <p>{title}</p>
                <div className="price">
                    <small>$</small>
                    <small>{price}</small>
                </div>
                <div className="product-rating">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} style={{ color: '#f0c14b' }} />
                    ))}
                </div>
                <div className='product-img'>
                    <img className='img-fluid' src={img} alt="" />
                </div>
                <div className="product-button text-center">
                    <button className='product-btn' onClick={addToBasket}>Add To Basket</button>
                </div>
            </div>
        </div>
    );
}
