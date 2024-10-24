import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';  
import { useLoginState } from '../contexts/LoginContext';

export default function useLogout() {
    const navigate = useNavigate();
    //const link = "Backend-Api";
    const {user, setUser, login, setLogin} = useLoginState();
    
    const handleLogout = () => {
        // fetch(link, {
        //     method: 'POST',
        //     headers: {
        //         // Authorization
        //     },
        //     credentials: "include"
        // })
        // .then(res => res.json())
        // .then(json => {
        //     if (json.msg === "You have been logged out! Goodbye.") {
        //         sessionStorage.removeItem('isLoggedIn');
        //         setLoginStatus(undefined);
        //         alert("You have been logged out!");
        //         navigate('/'); 
        //     }
        // })
        // .catch(err => {
        //     console.error("Logout failed: ", err);
        // });
        sessionStorage.removeItem('isLoggedIn');
        setLogin(false);
        setUser(null);
        alert("You have been logged out!");
        navigate('/'); 
    };

    return handleLogout;
        
}
