import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

// User Button Component
export default function BadgerUserButton() {
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
                  onClick={() => navigate('/userProfile')}>
            User's
            <br />
            Name
            </Button>
      );
}