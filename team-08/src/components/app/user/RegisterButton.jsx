import { Button } from "react-bootstrap";


// Login/Signup Button Component
// TODO: redirect to register page onClick
export default function RegisterButton() {
      return (<Button variant="outline-secondary"
            style={{width: '4vw',
            height: '4vw',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center'}}>
      Sign
      <br />
      Up
      </Button>);
}
