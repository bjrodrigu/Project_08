import { useRef, useContext, useState } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoginState } from '../contexts/LoginContext';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function BadgerSignup() {
    const { user, setUser, login, setLogin } = useLoginState();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const navigate = useNavigate();
    const usrEmail = useRef();
    const fullName = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
            alert("You must provide a valid email!");
            return;
            //used to test. 
        } else if (passwordInput.current.value === "") {
            alert("You must provide a password!");
            return;
        } else if (confirmPasswordInput.current.value !== passwordInput.current.value) {
            alert("Your passwords do not match!");
            return;
        } 

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/user/signup", {
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
                setError("That username has already been taken!");
            } else if (res.ok) {
                alert("Your registration is successful");
                setLogin(true);
                setUser(usrEmail.current.value);
                localStorage.setItem("isLoggedIn", JSON.stringify(usrEmail.current.value));
                navigate('/');
            } else {
                setError("Registration failed, please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false); // turn off loading
        }
    }
    return (
        <>
            <div style={styles.pageContainer}>
                <Card style={styles.card}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign up</h2>
                        <Form onSubmit={handleRegister}>
                            <Row>
                                <Col>
                                    <Button
                                    variant='outline-info'
                                    onClick={routeChange}
                                    style={{ top: '3vh', left: '3vw', borderRadius: '50%', height: '3rem', width: '3rem', position: 'absolute'}}
                                    >
                                    <ArrowLeft />
                                    </Button>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Form.Group controlId="userName" style={styles.formGroup}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    ref={usernameInput}
                                    style={styles.input}
                                    placeholder="Enter your username"
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

                            <Form.Group controlId="Email" style={styles.formGroup}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    ref={usrEmail}
                                    style={styles.input}
                                    type="email"
                                    placeholder="Please enter your email"
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
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
    },
};
