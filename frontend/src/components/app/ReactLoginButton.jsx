import { Button } from "react-bootstrap";

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