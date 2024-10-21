import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import StarRatings from 'react-star-ratings';
import { useEffect, useState, useContext } from 'react';

// Component to display details for a review. Has Title, description and rating
// TODO: Needs to show user profile/name
export default function BadgerSearchResult(review) {
      let [color, setColor] = useState('Light');

      return
            <Card border={color.toLowerCase()} onMouseEnter={() => { setColor('Info'); }} onMouseLeave={() => { setColor('Light'); }} style={{ height: 'auto', borderRadius: '1.5rem', marginTop: '2rem' }}>
                  <Card.Header style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
                        <Card.Title >{review.name}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                        <StarRatings rating={review.rating} numberOfStars={5} starRatedColor='black' starDimension='1.5rem' />
                        <br />
                        <br />
                        <Card.Text >{review.review}</Card.Text>
                  </Card.Body>
            </Card>
     
}