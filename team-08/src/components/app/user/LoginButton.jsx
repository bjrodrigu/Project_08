import { Button } from "react-bootstrap";


// Login Button Component
// TODO: redirect to login page onClick
export default function LoginButton() {
      return (<Button variant="outline-secondary"
                  style={{left: '91vw', 
                  position: 'fixed', 
                  width: '4vw', 
                  height: '4vw', 
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'}}>
            Login
            </Button>
      );
}