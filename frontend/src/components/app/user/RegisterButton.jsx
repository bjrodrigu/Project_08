import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";


// Sign up Button Component (shown in the header on the login page)
export default function RegisterButton() {
      const navigate = useNavigate();

      return (
            <Button variant="outline-secondary" size="sm" className="rounded-pill px-3"
                  onClick={() => navigate('/register')}>
                  Sign up
            </Button>
      );
}
