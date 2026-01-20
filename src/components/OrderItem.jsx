import moment from 'moment';
import ProductItem from './ProductItem';
import Subtotal from './SubTotal';

export default function OrderItem({order}){
    return (
        <div className='order mb-5 p-5 bg-white'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMM DO YYYY h:mma")}</p>
            <p className='order-id'>
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map((item)=>{
                return(
                    <ProductItem key={item.id} item={item} hiddenQuantity hiddenButton/>
                )
            })}
            <h2 className='fw-bold d-flex justify-content-end gap-2'>
                Order Total: <Subtotal orderAmount={order.data.amount} />
            </h2>
        </div>
    )
}
