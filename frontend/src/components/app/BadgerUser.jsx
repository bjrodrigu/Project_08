import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card, Button, Pagination, Form } from 'react-bootstrap';
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
    {
        id: 1,
        location: 'Library - Studyspot 1',
        userRating: 4.5,
        totalScore: 5,
        comment: 'Great place to study, quiet and comfortable.'
    },
    {
        id: 2,
        location: 'Library - Studyspot 2',
        userRating: 4.0,
        totalScore: 5,
        comment: 'Decent spot, but can be a bit noisy during peak hours.'
    },
    {
        id: 3,
        location: 'Library - Studyspot 3',
        userRating: 3.5,
        totalScore: 5,
        comment: 'Small study area, but still a good place to focus.'
    },
    {
        id: 4,
        location: 'Library - Studyspot 4',
        userRating: 4.8,
        totalScore: 5,
        comment: 'Very quiet, perfect for long study sessions.'
    },
    {
        id: 5,
        location: 'Library - Studyspot 5',
        userRating: 3.0,
        totalScore: 5,
        comment: 'Not enough outlets, but still usable.'
    },
    {
        id: 6,
        location: 'Library - Studyspot 6',
        userRating: 4.2,
        totalScore: 5,
        comment: 'Good ambiance and comfortable seating.'
    },
    {
        id: 7,
        location: 'Library - Studyspot 7',
        userRating: 4.7,
        totalScore: 5,
        comment: 'Spacious and quiet, perfect for group studies.'
    },
    {
        id: 8,
        location: 'Library - Studyspot 8',
        userRating: 3.8,
        totalScore: 5,
        comment: 'A bit cramped, but still a good place to focus.'
    },
    {
        id: 9,
        location: 'Library - Studyspot 9',
        userRating: 4.1,
        totalScore: 5,
        comment: 'Good lighting and comfortable seats.'
    },
    {
        id: 10,
        location: 'Library - Studyspot 10',
        userRating: 4.6,
        totalScore: 5,
        comment: 'Quiet and well-lit, ideal for studying.'
    }
];

export default function UserComments() {

    const [editIndex, setEditIndex] = useState(null); // current review in edition mode
    const [reviews, setReviews] = useState(test_reviews); // all reviews
    const [editedRating, setEditedRating] = useState('');
    const [editedComment, setEditedComment] = useState(''); // edited single review
    const [currentPage, setCurrentPage] = useState(1);
    //test
    const reviewsPerPage = 2;
    // const { user, setUser, login, setLogin } = useLoginState();

    const passwordInput = useRef();
    //const reviewsPerPage = 5;

    // // get current user's all reviews
    // useEffect(() => {
    //     fetch('/api/user/userId/reviews')
    //         .then((response) => response.json())
    //         .then((data) => setReviews(data));
    // }, []);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);


    const indexOfLastReviews = currentPage * reviewsPerPage;
    const indexOfFirstReviews = indexOfLastReviews - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReviews, indexOfLastReviews);
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = (page) => {
        setCurrentPage(currentPage => currentPage - 1)
    };
    const handleNextPage = (page) => {
        setCurrentPage(currentPage => currentPage + 1)
    };
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
        //         sessionStorage.removeItem('isLoggedIn');
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
        //const actualIndex = index + (currentPage - 1) * reviewsPerPage;

        const updatedReviews = reviews.map(review =>
            review.id === key ? { ...review, comment: editedComment, userRating: editedRating } : review
        );
        setReviews(updatedReviews); // update review.
        setEditIndex(null); // exit edition mode.
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
            <div style={userInfoStyle}>
                <p>Email: {user.email}</p>
                <Form>
                    <Form.Control
                        id='password'
                        type="password"
                        ref={passwordInput}
                        placeholder="Enter your password"
                    />
                </Form>
                <br></br>
                <Button variant="primary" onClick={handlePasswordChange}>Change Password</Button>
            </div>
            <div style={containerStyle}>
                <h2>Your Comments</h2>
                {currentReviews.map(review => (
                    <BadgerMessage
                        {...review}
                        editIndex={editIndex}
                        setEditIndex={setEditIndex}
                        handleEditReview={handleEditReview}
                        handleSaveEdit={handleSaveEdit}
                        editedComment={editedComment}
                        setEditedComment={setEditedComment}
                        editedRating={editedRating}
                        setEditedRating={setEditedRating}
                        handleRemove={handleRemove}
                    />
                ))}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            </div>
            <div style={backButtonStyle}>
                <Button variant="primary" onClick={() => { navigate('/') }}>
                    Back
                </Button>
            </div>
        </div >
    );
}