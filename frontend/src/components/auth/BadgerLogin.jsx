import { useRef, useContext } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoginState } from '../contexts/LoginContext';
import { ArrowLeft } from 'react-bootstrap-icons';


export default function BadgerLogin() {

    // TODO Create the login component.
    const { user, setUser, login, setLogin } = useLoginState();
    const usernameInput = useRef();
    const passwordInput = useRef();

    const navigate = useNavigate();
    //const link = "Backend-Api";

    // create routeChange function to redirect to home
    const routeChange = () => {
        let path = '../';
        navigate(path);
    }

    function handleLogin(e) {
        e?.preventDefault();

        if (usernameInput.current.value === "" ||
            passwordInput.current.value === "") {
            alert("You must provide both a username and password!");
            return;
            //used to test. 
        } else {
            setLogin(true);
            setUser(usernameInput.current.value)
            sessionStorage.setItem("isLoggedIn", usernameInput.current.value);
            navigate('/');
        }

        // fetch(link,{
        //     method: "POST",
        //     credentials: "include",
        //     headers:{
        //         // assumed we are going to use JSON to transfer data. 
        //         "Content-Type": "application/json"
        //     },
        //     // assumed we are going to use JSON to transfer data. 
        //     body: JSON.stringify({
        //         username: usernameInput.current.value,
        //         password: passwordInput.current.value
        //     })
        // })
        // .then(res => {
        //     if(res.status === 401){
        //         alert("Error: Incorrect login, please try again.");
        //     }

        //     if(res.status === 200){
        //         alert("Your login is successfull");
        //         const data = { username: usernameInput.current.value, loginStatus: 200 };
        //         // we are going to use session storage to store if user is logged in 
        //         sessionStorage.setItem("isLoggedIn",JSON.stringify(data));
        //         setLoginStatus(200);
        //         navigate('/');
        //     }

        // })
    }
    return (
        <>
          <Row style={{ width: '85vw', marginBottom: '2rem' }}>
            <Col sm='2'>
              <Button
                variant='outline-info'
                onClick={routeChange}
                style={{ top: '5vh', left: '5vw', borderRadius: '50%', height: '3rem', width: '3rem', position: 'fixed' }}
              >
                <ArrowLeft />
              </Button>
            </Col>
            <Col sm='10' className="d-flex justify-content-center" style={{ marginTop: '2rem' }}>
              <h1>Login</h1>
            </Col>
          </Row>
    
          <Card
            style={{
              maxWidth: '400px',
              margin: 'auto', 
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="userName" style={{ marginBottom: '15px' }}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  ref={usernameInput}
                  style={{ padding: '10px', borderRadius: '5px' }}
                  placeholder="Enter your username"
                />
              </Form.Group>
    
              <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordInput}
                  style={{ padding: '10px', borderRadius: '5px' }}
                  placeholder="Enter your password"
                />
              </Form.Group>
    
              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-3"
                style={{ padding: '10px', borderRadius: '5px' }}
              >
                Login
              </Button>
            </Form>
          </Card>
        </>
      );
    }