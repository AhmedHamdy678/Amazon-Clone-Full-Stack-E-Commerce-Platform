import { useState } from "react";
import "./SignUp.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import { useAuth } from "../../context/GlobalState";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [messageNoMatchPassword, setMessageNoMatchPassword] = useState(null);
    const [ message, setMessage ] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    // Register new user
    const signUpRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessageNoMatchPassword("Passwords do not match!");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("Account created successfully! Please log in.");
            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="signup">
            {message && <Alert variant="success">{message}</Alert>}
            {messageNoMatchPassword && <Alert variant="danger">{messageNoMatchPassword}</Alert>}
            <Link to="/">
                <img
                src={Logo}
                alt="Amazon Logo"
                height="40"
                className="login-logo mb-4"
                />
            </Link>
            <Card className="signup-card">
                <Card.Body>
                <h1 className="login-title mb-3">Sign-Up</h1>
                <Form onSubmit={signUpRegister}>
                    <Form.Group className="mb-4">
                    <Form.Label className="m-0 fw-bold">Email</Form.Label>
                    <Form.Control
                        value={email}
                        type="email"
                        required
                        placeholder="Enter Your Email"
                        onChange={handleEmailChange}
                    />
                    </Form.Group>

                    <Form.Group className="mb-4">
                    <Form.Label className="m-0 fw-bold">Password</Form.Label>
                    <Form.Control
                        value={password}
                        type="password"
                        required
                        placeholder="Enter Your Password"
                        onChange={handlePasswordChange}
                    />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label className="m-0 fw-bold">Password-Confirm</Form.Label>
                    <Form.Control
                        value={confirmPassword}
                        type="password"
                        required
                        placeholder="Enter Password"
                        onChange={handleConfirmPasswordChange}
                    />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-4">
                    Sign Up
                    </Button>
                </Form>
                <p className="login-terms mt-4">
                    By signing-in you agree to Amazon's Conditions of Use & Sale. Please
                    see our Privacy Notice.
                </p>
                </Card.Body>
            </Card>
            <div className="signup-new mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                Log-In
                </Link>
            </div>
        </div>
    );
}
