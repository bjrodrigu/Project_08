import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";


// Login/Signup Button Component
// TODO: redirect to register page onClick
export default function RegisterButton() {
      const navigate = useNavigate();
      
      return (<Button variant="outline-secondary"
            style={{
                  top: '2vh',
                  left: '91vw',
                  position: 'fixed',
                  width: '5vw',
                  height: '5vw',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'
            }}
            onClick={() => navigate('/register')}>
            Sign
            <br />
            Up
      </Button>);
}
