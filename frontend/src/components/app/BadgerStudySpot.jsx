import { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { useLocation, useNavigate } from 'react-router-dom';
import BadgerReview from '../app/BadgerReview';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLoginState } from '../contexts/LoginContext';
import { useLocationState } from '../contexts/MapContext';
import ReactAddReviewButton from './ReactAddReviewButton';
import { API_BASE } from "../../api";
import { formatMiles } from "../../distance";


// Component to display details, images and reviews for a particular location
export default function BadgerStudySpot() {

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

      // highlight this spot's building pin on the map while the page is open
      const { setSelectedBuilding, buildings = [] } = useLocationState();
      // Walking directions in Google Maps (no API key needed), by coordinates when we have them
      const building = buildings.find((b) => b.name === state.building);
      const directionsUrl = 'https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=' + (
            building && building.latitude != null
                  ? `${building.latitude},${building.longitude}`
                  : encodeURIComponent(`${state.building || state.name}, Madison, WI`));
      useEffect(() => {
            if (state && state.building) setSelectedBuilding(state.building);
      }, [state && state.building]);

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
                        <div>
                              <ReactAddReviewButton
                                    location={state}
                                    existingReview={userReview || null}
                                    buttonText={userReview ? "Edit your review" : "Add review"}
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
                              <Button variant='outline-secondary' onClick={routeChange} aria-label="Back to search" style={{ borderRadius: '50%', height: '2.75rem', width: '2.75rem', flexShrink: 0 }}><ArrowLeft /></Button>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                    <Card.Title as="h1" style={{ fontSize: '1.6rem', margin: 0, lineHeight: 1.2 }}>{state.name}</Card.Title>
                                    {state.building && <div className="text-muted" style={{ fontSize: '0.95rem' }}>{state.building}</div>}
                              </div>
                              {formatMiles(state.distance) && <Card.Subtitle className="text-muted" style={{ fontSize: '1.1rem', margin: 0, whiteSpace: 'nowrap' }}>{formatMiles(state.distance)}</Card.Subtitle>}
                              <Button variant='outline-primary' as="a" href={directionsUrl} target="_blank" rel="noopener noreferrer" style={{ height: '2.5rem', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>Directions</Button>
                        </div>
                  </Card.Header>



                  <Card.Body style={{ padding: 0 }}>
                        {(state.description || (state.tags && state.tags.length > 0)) && (
                              <div className="spot-summary">
                                    {state.reviews > 0 && (
                                          <div className="spot-rating">
                                                <StarRatings rating={Number(state.rating) || 0} numberOfStars={5}
                                                      starRatedColor="#c5050c" starEmptyColor="#d9dee3"
                                                      starDimension="1.05rem" starSpacing="0" />
                                                {Number(state.rating || 0).toFixed(1)}
                                                <span className="count">({state.reviews} review{state.reviews === 1 ? '' : 's'})</span>
                                          </div>
                                    )}
                                    {state.description && <p className="spot-description spot-description--full">{state.description}</p>}
                                    {state.tags && state.tags.length > 0 && (
                                          <div className="spot-tags">
                                                {state.tags.map((tag) => <span className="spot-tag" key={tag}>{tag}</span>)}
                                          </div>
                                    )}
                              </div>
                        )}
                        <div className="reviews-head">
                              <h2>Reviews</h2>
                              {renderAddReviewButton()}
                        </div>
                        {loading ? (
                              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
                                    <Spinner animation="border" role="status" />
                              </div>
                        ) : reviews.length > 0 ? (
                              <ul className="review-list">
                                    {reviews.map((review) => (
                                          <BadgerReview
                                                key={review.reviewId}
                                                name={review.title}
                                                review={review.comment}
                                                rating={review.rating}
                                                author={review.user && review.user.name}
                                                date={review.updatedAt || review.createdAt}
                                          />
                                    ))}
                              </ul>
                        ) : (
                              <p className="spot-empty">
                                    {login ? 'No reviews yet. Add the first one.' : 'No reviews yet. Log in to add the first one.'}
                              </p>
                        )}
                  </Card.Body>
            </Card>
      </>
}