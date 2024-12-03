import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card, Button, Pagination, Form, Row, Col, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { useLoginState } from '../contexts/LoginContext'
import useLogout from '../auth/useLogout';
import BadgerMessage from './BadgerMessage';
import BadgerFavoriteLocations from './BadgerFavoriteLocations';
import BadgerInfo from './BadgerInfo';
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




let test_fav_locations = [
    { id: 1, location: 'Library - Studyspot 1' },
    { id: 2, location: 'Library - Studyspot 2' },
    { id: 3, location: 'Library - Studyspot 3' },
    { id: 4, location: 'Library - Studyspot 4' },
    { id: 5, location: 'Library - Studyspot 5' },
    { id: 6, location: 'Library - Studyspot 6' },
    { id: 7, location: 'Library - Studyspot 7' },
    { id: 8, location: 'Library - Studyspot 8' },
    { id: 9, location: 'Library - Studyspot 9' },
    { id: 10, location: 'Library - Studyspot 10' },
];

export default function UserComments() {
    //userinfo
    const [userTemp, setUserTemp] = useState({
        username: 'JohnDoe',
        email: 'user@example.com',
        password: 'test123',
    });
    //extract username
    const { user, setUser, login, setLogin } = useLoginState();

    // comments
    const [editIndex, setEditIndex] = useState(null); // current review in edition mode
    const [reviews, setReviews] = useState([]); // all reviews
    const [editedRating, setEditedRating] = useState('');
    const [editedComment, setEditedComment] = useState(''); // edited single review
    const passwordInput = useRef();
    const navigate = useNavigate();
    const commentRef = useRef();
    const favRef = useRef();
    const hasMore = useState(true);
    const [currentCount, setCurrentCount] = useState(10); // Current number of displayed comments
    const [loading, setLoading] = useState(false); // Loading state
    const [currentReviews, setCurrentReviews] = useState([]);

    //fav-locations
    const [favorites, setFavorites] = useState(test_fav_locations);
    const [currentFavCount, setCurrentFavCount] = useState(5); // The current number of displayed favorites
    const [loadingFavorites, setLoadingFavorites] = useState(false); // Loading state for favorites
    const [currentFavorites, setCurrentFavorites] = useState([]); // Favorite list for the current page
    // get current user's review.
    // Fetch user reviews when the component loads
    useEffect(() => {
        const fetchUserReviews = async () => {
            setLoading(true); // Start loading
            try {
                console.log(user);
                const response = await fetch(`http://localhost:8080/review/getReviewsForUser?userName=${user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json(); // Parse JSON response
                setReviews(data); // Update reviews state
                console.log(data);
                setCurrentReviews(data.slice(0, currentCount)); // Display the initial number of reviews
            } catch (error) {
                console.error('Error fetching user reviews:', error);
                alert('Failed to load reviews. Please try again later.');
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserReviews(); // Call the function to fetch reviews
    }, []);

    //inifite scrolling for reviews.
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
            setCurrentCount((prev) => Math.min(prev + 3, reviews.length)); // Load 3 comments at a time
            setLoading(false);
        }, 1000);
    };
    // inite scrolling for favorites
    useEffect(() => {
        const handleFavScroll = () => {
            if (!favRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = favRef.current;

            // Load more when scrolled to the bottom
            if (scrollTop + clientHeight >= scrollHeight - 10 && !loadingFavorites && currentFavCount < favorites.length) {
                loadMoreFavorites();
            }
        };

        const currentCard = favRef.current;
        currentCard.addEventListener('scroll', handleFavScroll);

        return () => {
            currentCard.removeEventListener('scroll', handleFavScroll);
        };
    }, [currentFavCount, loadingFavorites, favorites]);

    const loadMoreFavorites = () => {
        setLoadingFavorites(true);
        setTimeout(() => {
            setCurrentFavCount((prev) => Math.min(prev + 3, favorites.length)); // Load 3 items at a time

            setLoadingFavorites(false);
        }, 1000);
    };





    const routeChange = () => {
        let path = '../';
        navigate(path);
    }


    const logout = useLogout();

    const handleSaveUserInfo = (updatedUser) => {
        console.log('Updated user info:', updatedUser);

        setUserTemp(updatedUser);

        // fetch('/api/update-user', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedUser),
        // })
        //     .then((response) => {
        //         if (response.ok) {
        //             console.log('User info updated successfully');
        //         } else {
        //             console.error('Failed to update user info');
        //         }
        //     });

        //logout();
    };



    // store saved edition
    const handleSaveEdit = (key, rating, comment) => {
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
            review.id === key ? { ...review, comment: comment, userRating: rating } : review
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

    // remove fav locations
    const handleRemoveFavorite = (location) => {
        //temp, will be removed when integration.
        setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.location !== location)
        );
        console.log(`Removing favorite location: ${location}`);
        // fetch(`/api/remove-favorite`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ location }),
        // }).then(response => console.log("API response:", response));
    };

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
                    {/* First row: User Info */}
                    <div className="row g-4">
                        <div className="col-12">
                            <BadgerInfo user={user} onSave={handleSaveUserInfo} />
                        </div>
                    </div>

                    {/* Second row: Two side-by-side cards */}
                    <div className="row g-4 mt-4">
                        {/* Infinite Scroll Comments */}
                        <div className="col-lg-6 col-md-12">
                            <Card
                                style={{
                                    height: '70vh', // Adjust height to fit page layout
                                    borderRadius: '2rem',
                                }}
                                ref={commentRef}
                            >
                                <Card.Header
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: '1rem',
                                        borderTopLeftRadius: '2rem',
                                        borderTopRightRadius: '2rem',
                                    }}
                                >
                                    <h5>Your comments</h5>
                                </Card.Header>
                                <Card.Body
                                    style={{
                                        height: 'calc(70vh - 4rem)', // minus head of headers
                                        overflowY: 'auto',
                                        padding: '1rem',
                                    }}
                                >
                                    {currentReviews.map((review) => (
                                        <BadgerMessage
                                            key={review.reviewId}
                                            id={review.reviewId}
                                            locationName={review.location?.name || "Unknown Location"}
                                            locationDescription={review.location?.description || "No Description"}
                                            title={review.title}
                                            rating={review.rating}
                                            comment={review.comment}
                                            handleSaveEdit={handleSaveEdit}
                                            handleRemove={handleRemove}
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

                        {/* Favorite Location */}
                        <div className="col-lg-6 col-md-12">
                            <Card
                                style={{
                                    height: '70vh', // Adjust the height to fit the page layout
                                    borderRadius: '2rem',
                                }}
                                ref={favRef}
                            >
                                <Card.Header
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: '1rem',
                                        borderTopLeftRadius: '2rem',
                                        borderTopRightRadius: '2rem',
                                    }}
                                >
                                    <h5>Favorite Locations</h5>
                                </Card.Header>
                                <Card.Body
                                    style={{
                                        height: 'calc(70vh - 4rem)', // minus head of headers
                                        overflowY: 'auto',
                                        padding: '1rem',
                                    }}
                                >
                                    {favorites.map((fav) => (

                                        <BadgerFavoriteLocations
                                            key={fav.id}
                                            location={fav.location}
                                            isStarred={true}
                                            onRemoveFavorite={handleRemoveFavorite}
                                        />
                                    ))}
                                    {loadingFavorites && (
                                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );

}