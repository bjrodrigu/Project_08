import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

export default function BadgerMessage(props) {
    const [showModal, setShowModal] = useState(false); 
    const [editedRating, setEditedRating] = useState(props.userRating); 
    const [editedComment, setEditedComment] = useState(props.comment); 

    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = () => {
        
        props.handleSaveEdit(props.id, editedRating, editedComment);
        handleCloseModal(); 
    };

    const handleRemove = () => {
       
        props.handleRemove(props.id);
        handleCloseModal(); 
    };

    return (
        <>
           
            <Card
                style={{ margin: "1rem 0", padding: '1rem', borderRadius: '1rem', cursor: "pointer" }}
                onClick={handleShowModal} 
            >
                <Card.Body>
                    <Card.Title>{props.location}</Card.Title>
                    <Card.Text>Rating: {props.userRating} / 5</Card.Text>
                    <Card.Text>{props.comment}</Card.Text>
                </Card.Body>
            </Card>

            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details for {props.location}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={editedRating}
                            onChange={(e) =>
                                setEditedRating(parseFloat(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={editedComment}
                            onChange={(e) =>
                                setEditedComment(e.target.value)
                            }
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleRemove}>
                        Remove
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
