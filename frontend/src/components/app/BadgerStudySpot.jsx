import { useEffect, useState } from 'react';
import { Card, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import BadgerReview from '../app/BadgerReview';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLoginState } from '../contexts/LoginContext';
import ReactAddReviewButton from './ReactAddReviewButton';
import { API_BASE } from "../../api";
import { formatMiles } from "../../distance";


// Component to display details, images and reviews for a particular location
export default function BadgerStudySpot() {

      // styles for no reviews message
      const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            border: '2px dashed #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            color: '#555',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '2rem auto',
            width: '80%',
            maxWidth: '600px',
      };
      const headingStyle = {
            fontSize: '1.8rem',
            color: '#333',
            marginBottom: '0.5rem',
      };
      const paragraphStyle = {
            fontSize: '1rem',
            color: '#777',
      };


      // retrieve the currently selected location via useLocation and save to a state object
      // retrieve and unpack user state
      const { user, setUser, login, setLogin } = useLoginState();
      const [color, setColor] = useState('light');
      // create a navigate object
      let navigate = useNavigate();
      // create routeChange function to redirect to home
      const routeChange = () => {
            let path = '../';
            navigate(path);
      }
      var { state } = useLocation();
      if (state != null) {
            localStorage.setItem("locState", JSON.stringify(state));

      } else {
            state = JSON.parse(localStorage.getItem("locState"));
            // if no local location is stored, redirect to home page
            if (state == null) {
                  navigate('../');
            }
            // console.log(state);
      }
      const location = JSON.parse(localStorage.getItem("locState"));
      const locationName = location.name;
      useEffect(() => {
            fetchReviews();
      }, []);

      // function to fetch reviews from the API for a specific location
      const [reviews, setReviews] = useState([]);
      const [loading, setLoading] = useState(false);
      const fetchReviews = async () => {
            setLoading(true);
            try {
                  const response = await fetch(`${API_BASE}/review/getReviewsForLocation?locationName=${encodeURIComponent(locationName)}`);
                  if (response.ok) {
                        setLoading(false);
                        const reviewsData = await response.json();
                        setReviews(reviewsData);
                  } else {
                        setLoading(false);
                        throw new Error('Failed to fetch reviews');
                  }
            } catch (error) {
                  console.error(error);
            }
      };


      // renders the add review button if the user is logged in, and the user has not already reviewed the location otherwise returns edit review button
      const renderAddReviewButton = () => {
            if (login) {
                  const userReview = reviews.find((review) => review.user.username === user);
                  return (
                        <div style={{ margin: '1rem', textAlign: 'right' }}>
                              <ReactAddReviewButton
                                    location={state}
                                    existingReview={userReview || null}
                                    buttonText={userReview ? "Edit Review" : "Add Review"}
                              />
                        </div>
                  );
            }
            return null;
      };

      return <>
            <Card key={'Primary'} className="side-panel">
                  <Card.Header style={{ padding: '1.25rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <Button variant='outline-info' onClick={routeChange} aria-label="Back to search" style={{ borderRadius: '50%', height: '2.75rem', width: '2.75rem', flexShrink: 0 }}><ArrowLeft /></Button>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                    <Card.Title style={{ fontSize: '1.6rem', margin: 0, lineHeight: 1.2 }}>{state.name}</Card.Title>
                                    {state.building && <div className="text-muted" style={{ fontSize: '0.95rem' }}>{state.building}</div>}
                              </div>
                              {formatMiles(state.distance) && <Card.Subtitle className="text-muted" style={{ fontSize: '1.1rem', margin: 0, whiteSpace: 'nowrap' }}>{formatMiles(state.distance)}</Card.Subtitle>}
                              <Button variant='primary' style={{ height: '2.5rem', flexShrink: 0 }}> Navigate</Button>
                        </div>
                  </Card.Header>



                  <Card.Body style={{ padding: '1rem' }}>
                        <ListGroup variant='flush'>
                              <ListGroup.Item>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <h2 style={{ margin: 0 }}>Reviews</h2>
                                          {renderAddReviewButton()}
                                    </div>
                              </ListGroup.Item>
                              {loading ? (
                                    <div
                                          style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                paddingTop: '50px'
                                          }}
                                    >
                                          <Spinner animation="border" role="status" />

                                    </div>
                              ) : (
                                    reviews.length > 0 ? (
                                          reviews.map((review) => (
                                                <BadgerReview
                                                      key={review.reviewId}
                                                      name={review.title}
                                                      review={review.comment}
                                                      rating={review.rating}
                                                />
                                          ))
                                    ) : (
                                          <div style={containerStyle}>
                                                <h2 style={headingStyle}>No Reviews Yet</h2>
                                                <p style={paragraphStyle}>Be the first to leave a review and share your experience!</p>
                                          </div>
                                    )
                              )}
                        </ListGroup>
                  </Card.Body>
            </Card>
      </>
}