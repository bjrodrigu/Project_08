import { Button } from "react-bootstrap";


// Login/Signup Button Component
// TODO: redirect to register page onClick
export default function RegisterButton() {
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
            }}>
            Sign
            <br />
            Up
      </Button>);
}
