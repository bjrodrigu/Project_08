import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

// Login/Signup Button Component
// TODO Needs to detect login status and change redirection from sign up to login
export default function ReactLoginButton() {
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
            Sign
            <br />
            Up
            </Button>
      );
}