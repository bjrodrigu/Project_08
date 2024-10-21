import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


// Login Button Component
export default function LoginButton() {
      const navigate = useNavigate();
      return(
            <Button variant="outline-secondary"
                  style={{left: '91vw', 
                  position: 'fixed', 
                  width: '5vw', 
                  height: '5vw', 
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'}} 
                  onClick={() => navigate('/login')}>
            Login
            </Button>
      );
}