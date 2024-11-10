import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import StarRatings from 'react-star-ratings';

// Component to display details for a review. Has Title, description and rating
// TODO: Needs to show user profile/name
export default function BadgerSearchResult(review) {
      let [color, setColor] = useState('Light');

      return <>
            <Card onMouseEnter={() => { setColor('Info'); }} onMouseLeave={() => { setColor('Light'); }} style={{ padding: '1rem', height: 'auto', borderRadius: '1.5rem', marginTop: '1rem' }}>
                  <Card.Title>{review.name}</Card.Title>
                  <StarRatings rating={review.rating} numberOfStars={5} starRatedColor='black' starDimension='1.5rem' />
                  <br />
                  <p>{review.review}</p>
            </Card>
      </>

}