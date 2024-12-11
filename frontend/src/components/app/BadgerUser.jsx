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



export default function UserComments() {
    //userinfo
    // const [userTemp, setUserTemp] = useState({
    //     username: 'JohnDoe',
    //     email: 'user@example.com',
    //     password: 'test123',
    // });
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
    const [favorites, setFavorites] = useState([]);
    const [currentFavCount, setCurrentFavCount] = useState(5); // The current number of displayed favorites
    const [loadingFavorites, setLoadingFavorites] = useState(false); // Loading state for favorites
    const [currentFavorites, setCurrentFavorites] = useState([]); // Favorite list for the current page
    // get current user's review.
    // Fetch user reviews when the component loads
    const [userInfo, setUserInfo] = useState({});

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/user/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userInfoArray = await response.json();

                const userInfo = {
                    name: userInfoArray[0],
                    email: userInfoArray[1],
                };

                setUserInfo(userInfo);
                console.log('User Info:', userInfo);

            } else {
                console.error('Failed to fetch user info:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };


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


    // fetch fav location

    const fetchFavLocations = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/favorite/getFavorites', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {

                const data = await response.json();
                // console.log("fav Location", data);
                setFavorites(data.map(loc => ({
                    description: loc.description,
                    favoriteId: loc.favorites[0].favoriteId,
                    locationId: loc.locationId,
                    name: loc.name,
                })));



            } else {
                console.error('Failed to fetch favorite locations');
            }
        } catch (error) {
            console.error('Error fetching favorite locations:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
        fetchUserReviews();
        fetchFavLocations();
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
        console.log("Updated user received in handleSaveUserInfo:", updatedUser);
        const requestBody = {};

        if (updatedUser.newName) {
            requestBody.newName = updatedUser.newName;
        }
        if (updatedUser.newEmail) {
            requestBody.newEmail = updatedUser.newEmail;
        }
        if (updatedUser.newPassword) {
            requestBody.newPassword = updatedUser.newPassword;
        }


        if (Object.keys(requestBody).length === 0) {
            console.error('No fields to update');
            return;
        }
        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('User info updated successfully');
                    alert("Information changed successfully!");
                    logout();

                } else {
                    console.error('Failed to update user info');
                }
            })
            .catch((error) => {
                console.error('Error updating user info:', error);
            });


    };



    // store saved edition
    const handleSaveEdit = (id, rating, comment, title) => {
        const token = localStorage.getItem("token");

        const queryParams = new URLSearchParams({
            locationName: reviews.find((r) => r.reviewId === id)?.location?.name || "",
            newRating: rating,
            newComment: comment,
            newTitle: title,
        });
        console.log(queryParams.toString());

        fetch(`http://localhost:8080/review/editReview?${queryParams.toString()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update review");
                }
                alert("Review updated successfully!");
                // Re-fetch reviews after successful update
                fetchUserReviews();
            })
            .catch((error) => {
                console.error("Error updating review:", error);
                alert("Failed to update review on the server.");
            });
    };


    const handleRemove = (id) => {

        const isConfirmed = window.confirm("Are you sure you want to delete this review?");
        if (!isConfirmed) return;


        const reviewToDelete = reviews.find((review) => review.reviewId === id);
        if (!reviewToDelete) {
            alert("Review not found.");
            return;
        }

        const queryParams = new URLSearchParams({
            locationName: reviewToDelete.location?.name || "",
        });

        const token = localStorage.getItem("token");


        fetch(`http://localhost:8080/review/deleteReview?${queryParams.toString()}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete the review");
                }
                alert("Review deleted successfully!");
                fetchUserReviews();

            })
            .catch((error) => {
                console.error("Error deleting review:", error);
                alert("There was an error deleting your review.");
            });
    };


    const handleRemoveFavorite = async (favoriteId) => {
        const API_BASE_URL = "http://localhost:8080/favorite";
        const token = localStorage.getItem("token");

        try {

            const response = await fetch(`${API_BASE_URL}/deleteFavorite?favorite_id=${favoriteId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                console.log(`Favorite with ID ${favoriteId} removed.`);
                await fetchFavLocations();
            } else {
                console.error("Failed to remove favorite.");
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
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
                            <BadgerInfo userInfo={userInfo} onSave={handleSaveUserInfo} />
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
                                            key={fav.locationId}
                                            location={fav.name}
                                            description={fav.description}
                                            favId={fav.favoriteId}
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