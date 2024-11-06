import { ListGroup, } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import StarRatings from 'react-star-ratings';

// Component to display details for a review. Has Title, description and rating
// TODO: Needs to show user profile/name
export default function BadgerSearchResult(review) {
      let [color, setColor] = useState('Light');

      return <>
            <ListGroup.Item border={color.toLowerCase()} onMouseEnter={() => { setColor('Info'); }} onMouseLeave={() => { setColor('Light'); }} style={{ height: 'auto', borderRadius: '1.5rem', marginTop: '2rem' }}>
                  <h1 >{review.name}</h1>
                  <StarRatings rating={review.rating} numberOfStars={5} starRatedColor='black' starDimension='1.5rem' />
                  <br />
                  <br />
                  <p >{review.review}</p>
            </ListGroup.Item>
      </>

}