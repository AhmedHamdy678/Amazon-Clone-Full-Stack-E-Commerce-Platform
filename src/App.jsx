import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Order from "./components/Order";
import LogOut from "./components/LogOut";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import { ProviderContecxt } from "./context/GlobalState";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Sqa2KRu9qpBsgtXKdLhG0k6HcwzyeYQ2DJqk0Ztyl81Z974QSJD0bjH8vTRqSkuvpbuXOfqNoAGbSV1obI6NHM100824PXnJo",
);

function App() {
  return (
    <div className="App">
      <ProviderContecxt>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/orders" element={<>
            <Header />
            <Order />
          </>} />
          <Route path="/logout" element={<LogOut />} />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route path="*" element={<h1>Not Page Found</h1>} />
        </Routes>
      </ProviderContecxt>
    </div>
  );
}

export default App;
