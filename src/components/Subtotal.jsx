import { useAuth } from '../context/GlobalState';
import CurrencyFormat from 'react-currency-format';

export default function Subtotal({ orderAmount }) {
    const { basket } = useAuth();
    const total = basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

    return (
        <div>
            <CurrencyFormat
                renderText={(value) => (
                    <>{value}</>
                )}
                decimalScale={2}
                value={ orderAmount ? orderAmount / 100 : total }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}
