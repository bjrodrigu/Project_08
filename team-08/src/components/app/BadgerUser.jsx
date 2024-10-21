// this component can only be shown after user clicks login 
// In this component, user will be able to check their own comments and ratings, and they are able to edit them or remove them.
// User could also click logout. 
import BadgerLogoutButton from "../auth/BadgerLogoutButton"
import { Card, Button, Row, Col } from 'react-bootstrap';
const reviews = [
    { name: '1', imageUrl: 'path-to-image-1', question: '123' },
    { name: '2', imageUrl: 'path-to-image-2', question: '123' }
];

export default function BadgerUser(props) {

    return (
        <div style={{ padding: '20px' }}>
            <h2>Share your experience</h2>
            {reviews.map((review, index) => (
                <Card key={index} style={{ marginBottom: '20px', padding: '15px', borderRadius: '1rem' }}>
                    <Row>
                        <Col sm={2}>
                            <Card.Img variant="top" src={review.imageUrl} style={{ borderRadius: '0.5rem' }} />
                        </Col>
                        <Col sm={8}>
                            <Card.Body>
                                <Card.Title>{review.name}</Card.Title>
                                <Card.Text>{review.question}</Card.Text>
                            </Card.Body>
                        </Col>
                        <Col sm={2}>
                            <Button variant="outline-danger" style={{ float: 'right', borderRadius: '50%' }}>X</Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Button variant="outline-success">Yes</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-danger">No</Button>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Card>
                
            ))}
             <Button variant="outline-secondary">Maybe</Button>
        </div>
    );

}