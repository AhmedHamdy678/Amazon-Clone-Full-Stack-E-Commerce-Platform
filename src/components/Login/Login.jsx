import { useState } from "react";
import "./login.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link , useNavigate} from "react-router-dom";
import Logo from "../../images/logo.png";
import { useAuth } from "../../context/GlobalState";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { Alert } from "react-bootstrap";

export default function Login() {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ message, setMessage ] = useState(null);

    // Handle input Email changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    // Handle input Password changes
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle Sign In
    const signIn = async(e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const authUser = userCredential.user;
            dispatch({
                type: "SET_USER",
                userPayload: authUser,
            });
            setMessage("Logged in successfully!");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="login">
            {message && <Alert variant="success">{message}</Alert>}
            <Link to="/">
                <img
                src={Logo}
                alt="Amazon Logo"
                height="40"
                className="login-logo mb-4"
                />
            </Link>
            <Card className="login-card">
                <Card.Body>
                <h1 className="login-title mb-3">Sign-In</h1>
                <Form onSubmit={signIn}>
                    <Form.Group className="mb-4">
                    <Form.Label className="m-0 fw-bold">Email</Form.Label>
                    <Form.Control
                        value={email}
                        type="text"
                        required
                        placeholder="Enter Your Email"
                        onChange={handleEmailChange}
                    />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label className="m-0 fw-bold">Password</Form.Label>
                    <Form.Control
                        value={password}
                        type="password"
                        required
                        placeholder="Enter Your Password"
                        onChange={handlePasswordChange}
                    />
                    </Form.Group>
                    <Button
                    onSubmit={signIn}
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                    >
                    Log In
                    </Button>
                </Form>
                <p className="login-terms mt-4">
                    By signing-in you agree to Amazon's Conditions of Use & Sale. Please
                    see our Privacy Notice.
                </p>
                <Button variant="light" className="w-100 mt-2">
                    <Link to="/signup" className="text-decoration-none">
                    Create Your Amazon Account
                    </Link>
                </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
