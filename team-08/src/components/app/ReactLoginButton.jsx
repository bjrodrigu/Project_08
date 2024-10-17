import { Button } from "react-bootstrap";

// Login/Signup Button Component
// TODO Needs to detect login status and change redirection from sign up to login
export default function ReactLoginButton() {
      return(
            <Button variant="outline-secondary"
                  style={{left: '91vw', 
                  position: 'fixed', 
                  width: '4vw', 
                  height: '4vw', 
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'}}>
            Sign
            <br />
            Up
            </Button>
      );
}