import { useEffect , useState , useRef} from "react";
import { useAuth } from "../context/GlobalState";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import SubTotal from "./SubTotal";
import { CardElement , useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "./axios";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { doc , setDoc} from "firebase/firestore";
import { db } from "../Firebase/Firebase.jsx";

export default function Payment() {
    const navigate = useNavigate();
    const { basket , dispatch , user} = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    // Calculate total item count in the basket
    const count = basket?.reduce((acc,item)=>{
        return acc + item.quantity;
    },0) || 0;

    // Calculate total price in the basket
    const total = basket?.reduce((amount, item) => item.price * item.quantity + amount, 0) || 0;

    useEffect(() => {
        const getClientSecret = async () => {
            if (total > 0) {
                try {
                    const response = await axios.post(`/payments/create?total=${Math.round(total * 100)}`);
                    setClientSecret(response.data.clientSecret);
                } catch (error) {
                    console.error("Error getting client secret:", error);
                    setError("الخادم غير متصل. الرجاء التأكد من تشغيل Firebase Functions");
                }
            }
        };
        getClientSecret();
    }, [ basket, total ]);

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            const ref = doc(db, "users",user?.uid , "orders", paymentIntent.id);
            setDoc(ref,{
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            navigate("/orders", {replace: true});
            dispatch({ type: "EMPTY_BASKET"});
        });
    }

    return (
        <div className="payment">
            <div className="count-item text-center p-3">Checkout (<Link to="/checkout">{count} items</Link>)</div>
            <div className="content p-3 bg-white">
                <div className="address p-3 d-flex align-items-center gap-5">
                    <h4 className="fw-bold">Delivery Address</h4>
                    <p>
                        Alexandria, Egypt
                    </p>
                </div>
                <hr/>
                <div className="preview-items p-3 row">
                    <h4 className="col-md-2 fw-bold">Review items and delivery</h4>
                    <div className="col-md-10">
                        {
                            basket?.map((item)=>{
                                return(
                                    <ProductItem key={item.id} item={item}/>
                                )
                            })
                        }
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h4 className="p-3 fw-bold col-md-2">Payment Method</h4>
                    <form onSubmit={handleSubmit} className="p-3 col-md-10">
                        <CardElement className="p-2 border mb-3" onChange={handleChange}/>
                        <div className="d-flex align-items-center gap-2 pt-3 pb-3 fs-4 fw-bold">Order Total:<SubTotal/></div>
                        <Button disabled={processing || succeeded } type="submit" className="btn-form">
                            <span>{processing ? <span>Processing</span> : "Buy Now"}</span>
                        </Button>
                    </form>
                </div>
                {error && <div className="text-danger">{error}</div>}
            </div>
        </div>
    )
}
