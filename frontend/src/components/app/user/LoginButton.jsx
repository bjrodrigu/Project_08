import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


// Login Button Component (lives in the header)
export default function LoginButton() {
      const navigate = useNavigate();
      return (
            <Button variant="outline-secondary" size="sm" className="rounded-pill px-3"
                  onClick={() => navigate('/login')}>
                  Log in
            </Button>
      );
}
