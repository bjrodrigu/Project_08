import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function BadgerInfo({ user, onSave }) {
    // 本地状态管理用户信息
    const [editMode, setEditMode] = useState({
        username: false,
        email: false,
        password: false,
    });

    const [formData, setFormData] = useState({ ...user }); // 复制 user 信息到本地状态

    // 切换编辑模式
    const toggleEditMode = (field) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // 更新表单数据
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // 保存数据
    const handleSave = (field) => {
        console.log(`Saving ${field}:`, formData[field]);
        toggleEditMode(field); // 退出编辑模式

        // 触发父组件的保存回调
        if (onSave) {
            onSave({ ...formData }); // 传递整个更新后的对象
        }
    };

    // 撤销更改
    const handleCancel = (field) => {
        setFormData((prev) => ({ ...prev, [field]: user[field] })); // 重置为初始值
        toggleEditMode(field); // 退出编辑模式
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
                            <Form.Label>Username</Form.Label>
                        </Col>
                        <Col sm={6}>
                            {editMode.username ? (
                                <Form.Control
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                />
                            ) : (
                                <span>{formData.username}</span>
                            )}
                        </Col>
                        <Col sm={2}>
                            {editMode.username ? (
                                <>
                                    <Button
                                        variant="link"
                                        onClick={() => handleSave('username')}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={() => handleCancel('username')}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="link"
                                    onClick={() => toggleEditMode('username')}
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

                    {/* Password Field */}
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
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}
