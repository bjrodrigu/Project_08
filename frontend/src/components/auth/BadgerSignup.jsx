import { useRef, useContext } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoginState } from '../contexts/LoginContext';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function BadgerSignup() {
    const { user, setUser, login, setLogin } = useLoginState();
    const usernameInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const navigate = useNavigate();
    const usrEmail = useRef();
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

    function handleRegister(e) {
        e.preventDefault();
        if (usernameInput.current.value === "") {
            alert("You must provide a username!");
            return;
            //used to test. 
        } else if (passwordInput.current.value === "") {
            alert("You must provide a password!");
            return;
        } else if (confirmPasswordInput != passwordInput.current.value) {
            alert("Your passwords do not match!");
            return;
        } else if (!validateEmail(usrEmail.current.value)) {
            alert("You must provide a valid email!");
            return;
        }

        else {
            // send data to backend. 

            // fetch("back-api-link", {
            //     method: "POST",
            //     credentials: "include",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         username: usernameInput,
            //         password: passwordInput,
            //         email: usrEmail
            //     })
            // })
            //     .then(res => {
            //         if (res.status === 409) {
            //             alert("That username has already been taken!");
            //         }
            //         if (res.status === 200) {
            //             alert("Your registration is successfull");
            //         }
            //     })

            // after registered, system will automatically login the registered account.
            setLogin(true);
            setUser(usernameInput.current.value)
            sessionStorage.setItem("isLoggedIn", usernameInput.current.value);
            navigate('/');
        }
    }
    return (
        <div style={styles.container}>
            <h2>Badger Signup</h2>
            <Form onSubmit={handleRegister}>

                <Form.Group controlId="userName: " style={{ marginBottom: '15px' }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        ref={usernameInput}
                        style={{ padding: '10px', borderRadius: '5px' }}
                        placeholder="Enter your username"
                    />
                </Form.Group>

                <Form.Group controlId="Password: " style={{ marginBottom: '15px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={passwordInput}
                        style={{ padding: '10px', borderRadius: '5px' }}
                        placeholder="Enter your password"
                    />
                </Form.Group>

                <Form.Group controlId="Cofirm Password: " style={{ marginBottom: '15px' }}>
                    <Form.Label>Cofirm Password: </Form.Label>
                    <Form.Control
                        ref={confirmPasswordInput}
                        style={{ padding: '10px', borderRadius: '5px' }}
                        placeholder="Confirm your password"
                    />
                </Form.Group>

                <Form.Group controlId="Email: " style={{ marginBottom: '15px' }}>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        ref={usrEmail}
                        style={{ padding: '10px', borderRadius: '5px' }}
                        placeholder="Please enter your email"
                    />
                </Form.Group>

            </Form>
            
        </div>
    )
}


const styles = {
    container: {
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    message: {
        color: '#4CAF50',
        fontWeight: 'bold',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
    },
};
