import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD:team-08/src/components/app/user/LoginButton.jsx

// Login Button Component
=======
// Login/Signup Button Component
// TODO Needs to detect login status and change redirection from sign up to login
<<<<<<<< HEAD:team-08/src/components/app/user/LoginButton.jsx
>>>>>>> d970ad2 (added comments):team-08/src/components/app/ReactLoginButton.jsx
export default function ReactLoginButton() {
========
export default function LoginButton() {
>>>>>>>> 345cc05 (update login page, create UserPageButton,the mechanism is after user login, UserPageButton is shown, user can click it to enter the user page. (Before loggedin, LoginButton was shown so that user have to log in) Will implement BadgerUser so that user could modify their comments and ratings):team-08/src/components/app/LoginButton.jsx
      const navigate = useNavigate();
      return(
            <Button variant="outline-secondary"
                  style={{left: '91vw', 
                  position: 'fixed', 
                  width: '4vw', 
                  height: '4vw', 
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'}} 
                  onClick={() => navigate('/login')}>
            Login
            </Button>
      );
}