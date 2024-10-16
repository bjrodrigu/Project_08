import { Card} from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router";

export default function() {
      let navigate = useNavigate();
      const routeChange = () => {
            let path ='home';
            navigate(path);
      }

      
      return <>
      <Card className="text-center" style={{height: '30vh',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30vw', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <Card.Title>
                  404 Page Not Found
            </Card.Title>
            <Button variant='outline-secondary' onClick={routeChange}>
                  Return Home
            </Button>
      </Card>
      </>;
}