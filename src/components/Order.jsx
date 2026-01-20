import { useState , useEffect}  from "react";
import { useAuth } from "../context/GlobalState";
import { collection, onSnapshot , orderBy , query} from "firebase/firestore"
import { db } from "../Firebase/Firebase";
import OrderItem from "./OrderItem";

export default function Order() {
    const {user} = useAuth();
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        if (user){
            const collRef = collection(db,"users",user?.uid,"orders");
            const orderedRef = query(collRef,orderBy("created","desc"));

            onSnapshot(orderedRef,(querySnapshot)=>{
                setOrders(querySnapshot.docs.map((doc)=>(
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                )));
            });
        }
        else{
            setOrders([]);
        }
    },[user]);

    return (
        <div className="orders bg-light p-5">
            <h1 className="m-0 p-0">Your Orders</h1>
            <div className='orders-order'>
                {orders?.map((order)=>{
                    return(
                        <OrderItem order={order}/>
                    )
                })}
            </div>
        </div>
    )
}
