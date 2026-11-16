import { useRef, useContext, useState } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoginState } from '../contexts/LoginContext';
import { ArrowLeft } from 'react-bootstrap-icons';
import { API_BASE } from "../../api";
import { useNotify } from '../contexts/ToastContext';

export default function BadgerSignup() {
    const { user, setUser, login, setLogin } = useLoginState();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const navigate = useNavigate();
    const usrEmail = useRef();
    const fullName = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const notify = useNotify();

    //const link = "Backend-Api";

    // create routeChange function to redirect to home
    const routeChange = () => {
        let path = '../';
        navigate(path);
    }
    // check if email is valid. 
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async function handleRegister(e) {
        e.preventDefault();
        setError("");
        if (!validateEmail(usrEmail.current.value)) {
            setError("Enter a valid email address.");
            return;
            //used to test. 
        } else if (passwordInput.current.value === "") {
            setError("Choose a password.");
            return;
        } else if (confirmPasswordInput.current.value !== passwordInput.current.value) {
            setError("The passwords don't match.");
            return;
        } 

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/user/signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: usrEmail.current.value,
                    password: passwordInput.current.value,
                    fullName: fullName.current.value
                })
            });

            if (res.status === 409) {
                setError("An account with that email already exists. Log in instead.");
            } else if (res.ok) {
                // Sign in right away so the new account has a token for reviews and favorites
                const email = usrEmail.current.value;
                const loginRes = await fetch(`${API_BASE}/user/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password: passwordInput.current.value })
                });
                const data = loginRes.ok ? await loginRes.json() : null;
                if (data && data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("tokenExpiration", Date.now() + data.expiresIn);
                    localStorage.setItem("isLoggedIn", JSON.stringify(email));
                    setLogin(true);
                    setUser(email);
                    notify("Account created. You're logged in.");
                    navigate('/');
                } else {
                    notify("Account created. Log in to continue.");
                    navigate('/login');
                }
            } else {
                setError("Couldn't create the account. Try again.");
            }
        } catch (err) {
            setError("Couldn't reach the server. Check that the backend is running and try again.");
        } finally {
            setLoading(false); // turn off loading
        }
    }
    return (
        <>
            <Row style={{ width: '85vw', marginBottom: '2rem' }}>
                <Col sm='2'>
                    <Button
                        variant='outline-secondary' aria-label="Back"
                        onClick={routeChange}
                        className="page-back-button" style={{ top: '5vh', left: '5vw', borderRadius: '50%', height: '3rem', width: '3rem', position: 'fixed' }}
                    >
                        <ArrowLeft />
                    </Button>
                </Col>
                <Col sm='10' className="d-flex justify-content-center" style={{ marginTop: '2rem' }}>

                </Col>
            </Row>

            <div style={styles.pageContainer}>
                <Card style={styles.card}>
                    <Card.Body>
                        <h1 className="text-center mb-4" style={{ fontSize: '1.75rem' }}>Sign up</h1>
                        <Form onSubmit={handleRegister}>

                            <Form.Group controlId="Email" style={styles.formGroup}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    ref={usrEmail}
                                    style={styles.input}
                                    type="email"
                                    placeholder="Please enter your email"
                                />
                            </Form.Group>

                            <Form.Group controlId="Password" style={styles.formGroup}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    ref={passwordInput}
                                    style={styles.input}
                                    type="password"
                                    placeholder="Enter your password"
                                />
                            </Form.Group>

                            <Form.Group controlId="ConfirmPassword" style={styles.formGroup}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    ref={confirmPasswordInput}
                                    style={styles.input}
                                    type="password"
                                    placeholder="Confirm your password"
                                />
                            </Form.Group>


                            <Form.Group controlId="FullName" style={styles.formGroup}>
                                <Form.Label>Your Full Name</Form.Label>
                                <Form.Control
                                    ref={fullName}
                                    style={styles.input}
                                    type="text"
                                    placeholder="Please enter your full name"
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100 mt-3"
                                disabled={loading}
                                style={styles.button}
                            >
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Registering
                                    </>
                                ) : (
                                    'Register'
                                )}
                            </Button>
                        </Form>
                        {error && <p className="form-error" role="alert">{error}</p>}
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '500px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
    },
};
