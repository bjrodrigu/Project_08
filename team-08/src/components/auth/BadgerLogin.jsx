import {useRef,useContext} from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {BadgerLoginStatusContext, useLoginState} from '../contexts/BadgerLoginStatusContext';
import { ArrowLeft } from 'react-bootstrap-icons';


export default function BadgerLogin() {

    // TODO Create the login component.
    const {user, setUser, login, setLogin} = useLoginState();
    const usernameInput = useRef();
    const passwordInput = useRef();

    const navigate = useNavigate();
    //const link = "Backend-Api";

    // create routeChange function to redirect to home
    const routeChange = () => {
        let path ='../';
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
            sessionStorage.setItem("isLoggedIn",usernameInput.current.value);
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
    return <>
        <Row style={{width: '85vw'}}>
            <Col sm='1'>
                <Button variant='outline-info' onClick={routeChange} style={{borderRadius: '50%', height: '3rem', width: '3rem'}}><ArrowLeft /></Button>
            </Col>
            <Col sm='11'>
                <h1>Login</h1>
            </Col>
        </Row>
        <Form>
            <Row style={{width: '85vw'}}>
                <Col sm='1'></Col>
                <Col sm='11'>
                    <Form.Label htmlFor='userName' >username</Form.Label>
                    <Form.Control id='userName' ref={usernameInput}></Form.Control>
                </Col>
            </Row>
            <Row style={{width: '85vw'}}>
                <Col sm='1'></Col>
                <Col sm='11'>
                    <Form.Label htmlFor='password' >password</Form.Label>
                    <Form.Control id='password' type="password" ref={passwordInput}></Form.Control>
                </Col>
            </Row>
            <Row style={{width: '85vw'}}>
                <Col sm='1'></Col>
                <Col sm='11'>
                    <br />
                    <Button type="submit" variant="primary" onClick={handleLogin} >Login</Button>
                </Col>
            </Row>
        </Form>
    </>
}
   