import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


export default function LogOut() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    
    const handleLogOut = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            setMessage("You have been logged out successfully.");
            navigate("/login");
        }).catch((error) => {
            alert(error.message);
        });
    };

    return (
        <div style={{height:"100vh"}} className='log-out d-flex flex-column align-items-center justify-content-center'>
            <Card>
            <Card.Body style={{width:"400px"}} className='text-center'>
                <h1 className="login-title mb-3 fw-bold">Log Out</h1>
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleLogOut}>
                    <Form.Group className="mb-4">
                        <Form.Label className="m-0 fw-bold">Are you sure you want to log out?</Form.Label>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log Out
                    </Button>
                </Form>
            </Card.Body>
            </Card>
        </div>
    )
}
