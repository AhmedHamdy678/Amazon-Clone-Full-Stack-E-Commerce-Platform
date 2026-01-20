import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import searchIcon from "../images/icons/searchIcon.png";
import { useAuth } from "../context/GlobalState";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const { user , basket} = useAuth();
    const [message, setMessage] = useState(null);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            setMessage("You have been logged out successfully.");
            navigate("/login");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img
                        src={Logo}
                        alt="Amazon Logo"
                        height="40"
                        className="d-inline-block align-text-top"
                    />
                </Link>

                <div className="d-flex flex-grow-1 mx-3">
                    <div className="input-group">
                        <input
                        className="form-control"
                        type="text"
                        placeholder="Search Amazon"
                        aria-label="Search"
                        />
                        <button className="btn btn-warning" type="button">
                            <img src={searchIcon} alt="Search" height="20" />
                        </button>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    {message && (<div className="text-white me-3">{message}</div>)}
                    {user ? (
                        <div className="text-white">
                            <div className="small">Hello, {user.email}</div>
                            <div
                                className="fw-bold"
                                style={{ cursor: "pointer" }}
                                onClick={handleLogOut}
                            >
                                Sign Out
                            </div>
                        </div>
                    ) : (   
                        <Link to="/login" className="text-decoration-none">
                            <div className="text-white">
                                <div className="small">Hello, Guest</div>
                                <div className="fw-bold">Sign In</div>
                            </div>
                        </Link>
                    )}

                    <Link to="/orders" className="text-decoration-none">
                        <div className="text-white">
                            <div className="small">Returns</div>
                            <div className="fw-bold">& Orders</div>
                        </div>
                    </Link>

                    <div className="text-white">
                        <div className="small">Your</div>
                        <div className="fw-bold">Prime</div>
                    </div>

                    <Link
                        to="/checkout"
                        className="text-decoration-none position-relative"
                    >
                        <div className="text-white d-flex align-items-center">
                            <span className="fs-2">🛒</span>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {basket?.reduce((total, item) => total + item.quantity, 0) || 0}
                                <span className="visually-hidden">basket items</span>
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
