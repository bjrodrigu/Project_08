import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function BadgerInfo({ userInfo, onSave }) {


    useEffect(() => {
        setFormData({ ...userInfo }); // 更新 formData
    }, [userInfo]);

    // Local state to manage user information
    const [editMode, setEditMode] = useState({
        name: false,
        email: false,
    });

    const [formData, setFormData] = useState({ ...userInfo }); // Copy user information into local state

    // Toggle edit mode for a specific field
    const toggleEditMode = (field) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // Update form data for a specific field
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Save the updated data
    const handleSave = (field) => {
        console.log(`Saving ${field}:`, formData[field]);
        toggleEditMode(field); // Exit edit mode

        if (onSave) {
            
            const updatedField = {};
            if (field === "name") {
                updatedField.newName = formData[field]; 
            } else if (field === "email") {
                updatedField.newEmail = formData[field]; 
                
            }

            console.log("updated info in Badgerinfo:",updatedField);
            onSave(updatedField);
        }
    };

    // Cancel changes and reset to initial value
    const handleCancel = (field) => {
        setFormData((prev) => ({ ...prev, [field]: userInfo[field] })); // Reset to initial value
        toggleEditMode(field); // Exit edit mode
    };



    return (
        <Card
            style={{
                height: '50vh',
                overflowY: 'hidden',
                borderRadius: '2rem',
            }}
        >
            <Card.Header
                style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1rem',
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '2rem',
                }}
            >
                <h5>Your Information</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    {/* Username Field */}
                    <Row className="mb-3 align-items-center">
                        <Col sm={4}>
                            <Form.Label>Name</Form.Label>
                        </Col>
                        <Col sm={6}>
                            {editMode.name ? (
                                <Form.Control
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                            ) : (
                                <span>{formData.name}</span>
                            )}
                        </Col>
                        <Col sm={2}>
                            {editMode.name ? (
                                <>
                                    <Button
                                        variant="link"
                                        onClick={() => handleSave('name')}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={() => handleCancel('name')}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="link"
                                    onClick={() => toggleEditMode('name')}
                                >
                                    Edit
                                </Button>
                            )}
                        </Col>
                    </Row>

                    {/* Email Field */}
                    <Row className="mb-3 align-items-center">
                        <Col sm={4}>
                            <Form.Label>Email</Form.Label>
                        </Col>
                        <Col sm={6}>
                            {editMode.email ? (
                                <Form.Control
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            ) : (
                                <span>{formData.email}</span>
                            )}
                        </Col>
                        <Col sm={2}>
                            {editMode.email ? (
                                <>
                                    <Button
                                        variant="link"
                                        onClick={() => handleSave('email')}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={() => handleCancel('email')}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="link"
                                    onClick={() => toggleEditMode('email')}
                                >
                                    Edit
                                </Button>
                            )}
                        </Col>
                    </Row>

                    {/* Password Field
                <Row className="mb-3 align-items-center">
                    <Col sm={4}>
                        <Form.Label>Password</Form.Label>
                    </Col>
                    <Col sm={6}>
                        {editMode.password ? (
                            <Form.Control
                                type="text"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                        ) : (
                            <span>********</span>
                        )}
                    </Col>
                    <Col sm={2}>
                        {editMode.password ? (
                            <>
                                <Button
                                    variant="link"
                                    onClick={() => handleSave('password')}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="link"
                                    onClick={() => handleCancel('password')}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="link"
                                onClick={() => toggleEditMode('password')}
                            >
                                Edit
                            </Button>
                        )}
                    </Col>
                </Row> */}
                </Form>
            </Card.Body>
        </Card>
    );

}
