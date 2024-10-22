//TODO: remove or edit user reviews.
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card, Button, Pagination, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext'
import useLogout from '../auth/useLogout';
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

const reviews = [
    {
        location: 'Library - Studyspot 1',
        userRating: 4.5,
        totalScore: 5,
        comment: 'Great place to study, quiet and comfortable.'
    },
    {
        location: 'Library - Studyspot 2',
        userRating: 4.0,
        totalScore: 5,
        comment: 'Decent spot, but can be a bit noisy during peak hours.'
    },
    {
        location: 'Library - Studyspot 3',
        userRating: 3.5,
        totalScore: 5,
        comment: 'Small study area, but still a good place to focus.'
    },
    {
        location: 'Library - Studyspot 4',
        userRating: 4.8,
        totalScore: 5,
        comment: 'Very quiet, perfect for long study sessions.'
    },
    {
        location: 'Library - Studyspot 5',
        userRating: 3.0,
        totalScore: 5,
        comment: 'Not enough outlets, but still usable.'
    },
    {
        location: 'Library - Studyspot 6',
        userRating: 4.2,
        totalScore: 5,
        comment: 'Good ambiance and comfortable seating.'
    },
    {
        location: 'Library - Studyspot 7',
        userRating: 4.7,
        totalScore: 5,
        comment: 'Spacious and quiet, perfect for group studies.'
    },
    {
        location: 'Library - Studyspot 8',
        userRating: 3.8,
        totalScore: 5,
        comment: 'A bit cramped, but still a good place to focus.'
    },
    {
        location: 'Library - Studyspot 9',
        userRating: 4.1,
        totalScore: 5,
        comment: 'Good lighting and comfortable seats.'
    },
    {
        location: 'Library - Studyspot 10',
        userRating: 4.6,
        totalScore: 5,
        comment: 'Quiet and well-lit, ideal for studying.'
    }
];

export default function UserComments() {
    //const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    //test
    const reviewsPerPage = 2;
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

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
                {currentReviews.map((review, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <Card.Title>{review.location}</Card.Title>
                            <Card.Text>Rating: {review.userRating} / 5</Card.Text>
                            <Card.Text>{review.comment}</Card.Text>
                        </Card.Body>
                    </Card>
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