import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

// UserPage Button Component
// TODO Needs to detect login status and change redirection from main page to user profile
//TODO Needs to find current user name
export default function UserPageButton() {
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
            User 
            <br />
            Name
            </Button>
      );
}