//This components represents each reviews in user's profile
//child component of BadgerUser

export default function BadgerMessage(props) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.location}</Card.Title>
                <Card.Text>Rating: {props.userRating} / 5</Card.Text>
                {props.editIndex === props.id ? (
                    // edition mode
                    <>
                        <Form.Control
                            as="textarea"
                            value={props.editedComment}
                            onChange={(e) => props.setEditedComment(e.target.value)}
                        />
                        <Button variant="success" onClick={() => props.handleSaveEdit(props.id)}>Save</Button>
                        <Button variant="secondary" onClick={() => props.setEditIndex(null)}>Cancel</Button>
                    </>
                ) : (

                    <>
                        <Card.Text>{props.comment}</Card.Text>
                        <Button variant="secondary" onClick={() => props.handleEditReview(props.id,props.comment)}>Edit</Button>
                        <Button variant="danger" onClick={() => props.handleRemove(props.id)}>Remove</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}