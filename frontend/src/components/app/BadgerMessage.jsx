import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

export default function BadgerMessage(props) {
    const [showModal, setShowModal] = useState(false); // 控制弹窗状态
    const [editedRating, setEditedRating] = useState(props.userRating); // 本地编辑的评分
    const [editedComment, setEditedComment] = useState(props.comment); // 本地编辑的评论

    // 打开和关闭弹窗
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = () => {
        // 调用父组件的保存函数
        props.handleSaveEdit(props.id, editedRating, editedComment);
        handleCloseModal(); // 关闭弹窗
    };

    const handleRemove = () => {
        // 调用父组件的删除函数
        props.handleRemove(props.id);
        handleCloseModal(); // 关闭弹窗
    };

    return (
        <>
            {/* 主卡片 */}
            <Card
                style={{ margin: "1rem 0", cursor: "pointer" }}
                onClick={handleShowModal} // 点击卡片显示弹窗
            >
                <Card.Body>
                    <Card.Title>{props.location}</Card.Title>
                    <Card.Text>Rating: {props.userRating} / 5</Card.Text>
                    <Card.Text>{props.comment}</Card.Text>
                </Card.Body>
            </Card>

            {/* 弹窗 */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details for {props.location}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 编辑表单 */}
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
