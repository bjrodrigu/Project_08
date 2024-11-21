//This components represents each reviews in user's profile
//child component of BadgerUser
import { Card, Button, Form } from 'react-bootstrap';


export default function BadgerMessage(props) {

    return (
        <Card style={{ margin: '1rem 0' }}>
            <Card.Body>
                <Card.Title>{props.location}</Card.Title>
                <Card.Text>Rating: {props.userRating} / 5</Card.Text>
                {props.editIndex === props.id ? (
                    // edition mode
                    <>
                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={props.editedRating}
                                onChange={(e) => props.setEditedRating(parseFloat(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={props.editedComment}
                                onChange={(e) => props.setEditedComment(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" onClick={() => props.handleSaveEdit(props.id)}>Save</Button>
                        <Button variant="secondary" onClick={() => props.setEditIndex(null)}>Cancel</Button>
                    </>
                ) : (

                    <>
                        <Card.Text>{props.comment}</Card.Text>
                        <Button variant="secondary" onClick={() => props.handleEditReview(props.id, props.comment,props.userRating)}>Edit</Button>
                        <Button variant="danger" onClick={() => props.handleRemove(props.id)}>Remove</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}