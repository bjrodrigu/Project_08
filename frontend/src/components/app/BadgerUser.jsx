import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card, Button, Pagination, Form, Row, Col, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { useLoginState } from '../contexts/LoginContext'
import useLogout from '../auth/useLogout';
import BadgerMessage from './BadgerMessage';
//style
const backButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
};

const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto'
};

const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    textAlign: 'center'
}
//example
const user = {
    email: 'user@example.com'
};

let test_reviews = [
    { id: 1, location: 'Library - Studyspot 1', userRating: 4.5, totalScore: 5, comment: 'Great place to study.' },
    { id: 2, location: 'Library - Studyspot 2', userRating: 4.0, totalScore: 5, comment: 'A bit noisy sometimes.' },
    { id: 3, location: 'Library - Studyspot 3', userRating: 3.5, totalScore: 5, comment: 'Small but cozy.' },
    { id: 4, location: 'Library - Studyspot 4', userRating: 4.8, totalScore: 5, comment: 'Very quiet.' },
    { id: 5, location: 'Library - Studyspot 5', userRating: 3.0, totalScore: 5, comment: 'Not enough outlets.' },
    { id: 6, location: 'Library - Studyspot 6', userRating: 4.2, totalScore: 5, comment: 'Good ambiance.' },
    { id: 7, location: 'Library - Studyspot 7', userRating: 4.7, totalScore: 5, comment: 'Spacious and quiet.' },
    { id: 8, location: 'Library - Studyspot 8', userRating: 3.8, totalScore: 5, comment: 'A bit cramped.' },
    { id: 9, location: 'Library - Studyspot 9', userRating: 4.1, totalScore: 5, comment: 'Good lighting.' },
    { id: 10, location: 'Library - Studyspot 10', userRating: 4.6, totalScore: 5, comment: 'Ideal for studying.' },
];

export default function UserComments() {

    const [editIndex, setEditIndex] = useState(null); // current review in edition mode
    const [reviews, setReviews] = useState(test_reviews); // all reviews
    const [editedRating, setEditedRating] = useState('');
    const [editedComment, setEditedComment] = useState(''); // edited single review
    const passwordInput = useRef();
    const navigate = useNavigate();
    const commentRef = useRef();
    const favRef = useRef();
    const hasMore = useState(true);
    const [currentCount, setCurrentCount] = useState(5); // 当前显示评论的数量
    const [loading, setLoading] = useState(false); // 加载状态
    const [currentReviews, setCurrentReviews] = useState([]);
    useEffect(() => {

        setCurrentReviews(reviews.slice(0, currentCount));
    }, [currentCount, reviews]);

    useEffect(() => {

        const handleScroll = () => {
            if (!commentRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = commentRef.current;


            if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && currentCount < reviews.length) {
                loadMoreReviews();
            }
        };

        const currentCard = commentRef.current;
        currentCard.addEventListener('scroll', handleScroll);

        return () => {
            currentCard.removeEventListener('scroll', handleScroll);
        };
    }, [currentCount, loading, reviews]);

    const loadMoreReviews = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrentCount((prev) => Math.min(prev + 3, reviews.length)); // 每次加载 3 条评论
            setLoading(false);
        }, 1000);
    };





    const routeChange = () => {
        let path = '../';
        navigate(path);
    }


    const logout = useLogout();


    // change password, user will be logged out.
    const handlePasswordChange = (e) => {
        e?.preventDefault();

        if (passwordInput.current.value === "") {
            alert("Password invalid!");
            // user will be loged out after changing password
            return;
        }
        //     fetch('/api/change-password', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',

        //         },
        //         body: JSON.stringify({
        //             currentPassword: currentPassword,
        //             newPassword: newPassword
        //         })
        //     })
        //     .then(response => {
        //         if (!response.ok) {
        //             return response.json().then(err => { throw new Error(err.message); });
        //         }
        //         return response.json();  
        //     })
        //     .then(result => {    
        //         localStorage.removeItem('isLoggedIn');
        //         setLoginStatus(undefined);
        //         alert('Password changed successfully');
        //         navigate('/');
        //     })
        //     .catch(error => {
        //         console.error('Error changing password:', error);
        //         alert(`Error: ${error.message}`);  
        //     });

        //test
        alert('Password changed successfully');
        logout();
    }

    // start edition mode
    const handleEditReview = (key, comment, rating) => {
        setEditIndex(key);
        //store info before editing, so that original comment can be shown while editing
        setEditedComment(comment);
        setEditedRating(rating);
    };

    // store saved edition
    const handleSaveEdit = (key) => {
        // fetch(`/api/reviews/${review.id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ ...review, comment: editedComment }) // update review
        // })
        //     .then(response => response.json())
        //     .then(updatedReview => {
        //         const updatedReviews = reviewList.map((r, index) =>
        //             index === editIndex ? { ...r, comment: editedComment } : r
        //         );
        //         setReviewList(updatedReviews); // display updated review
        //         setEditIndex(null); // quit the edition mode
        //         alert('Review updated successfully');
        //     })
        //     .catch(error => {
        //         console.error('Error updating review:', error);
        //         alert(`Error: ${error.message}`);
        //     });

        //template


        const updatedReviews = reviews.map(review =>
            review.id === key ? { ...review, comment: editedComment, userRating: editedRating } : review
        );
        setReviews(updatedReviews); // update review.
        setEditIndex(null); // exit edition mode.
        setCurrentReviews(updatedReviews.slice(0, currentCount)); // Synchronized Updates currentReviews
    };

    const handleRemove = (key) => {
        //template
        const isConfirmed = window.confirm("Are you sure you want to delete this review?");
        if (!isConfirmed) return;

        const updatedReviews = reviews.filter(review => review.id !== key);
        setReviews(updatedReviews);
    }

    return (
        <div>
            <Row style={{ width: '85vw', marginBottom: '2rem' }}>
                <Col sm="2">
                    <Button
                        variant="outline-info"
                        onClick={routeChange}
                        style={{
                            top: '5vh',
                            left: '5vw',
                            borderRadius: '50%',
                            height: '3rem',
                            width: '3rem',
                            position: 'fixed',
                        }}
                    >
                        <ArrowLeft />
                    </Button>
                </Col>
                <Col sm="10" className="d-flex justify-content-center" style={{ marginTop: '2rem' }}></Col>
            </Row>

            <div>
                <div className="container my-4">
                    <div className="row g-4">
                        {/* Card 1: User Info */}
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <Card
                                style={{
                                    height: '85vh',
                                    overflowY: 'hidden',
                                    borderRadius: '2rem',
                                }}

                            >
                                <Card.Body>
                                    <Card.Title>User Info</Card.Title>
                                    <Card.Text>Email: {user.email}</Card.Text>
                                    <Form>
                                        <Form.Control
                                            id="password"
                                            type="password"
                                            ref={passwordInput}
                                            placeholder="Enter your password"
                                        />
                                    </Form>
                                    <Button className="mt-3" variant="primary" onClick={handlePasswordChange}>
                                        Change Password
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>


                        {/* Infinite Scroll Comments */}
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <Card
                                style={{
                                    height: '85vh', // 限制卡片整体高度
                                    borderRadius: '2rem', // 设置圆角
                                }}
                                ref={commentRef}
                            >
                                <Card.Header style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', }}>
                                    <h5>Your comments</h5>
                                </Card.Header>
                                <Card.Body
                                    style={{
                                        height: 'calc(85vh - 4rem)', // 卡片总高度减去 Header 的高度，动态调整
                                        overflowY: 'auto', // 滚动条仅作用于内容区域
                                        padding: '1rem',
                                    }}
                                >
                                    {currentReviews.map((review) => (
                                        <BadgerMessage
                                            key={review.id}
                                            {...review}
                                            handleSaveEdit={handleSaveEdit}
                                            handleRemove={handleRemove}
                                            handleEditReview={handleEditReview}
                                        />
                                    ))}
                                    {loading && (
                                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>


                        {/* Card 3: fav location */}
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <Card
                                style={{
                                    height: '85vh',
                                    overflowY: 'hidden',
                                    borderRadius: '2rem',
                                }}
                            >
                                <Card.Body>
                                    <Card.Title>Favorite Location</Card.Title>
                                    <p>hahahahaha</p>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );

}