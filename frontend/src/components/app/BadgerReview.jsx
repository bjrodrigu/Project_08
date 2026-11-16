import StarRatings from 'react-star-ratings';

// One review in a spot's review list: title, rating and comment.
// TODO (docs/UI_BACKLOG.md): show the reviewer's name and the date.
export default function BadgerReview({ name, rating, review }) {
      return (
            <li className="review-row">
                  <div className="review-top">
                        <h3 className="review-title">{name}</h3>
                        <StarRatings rating={Number(rating) || 0} numberOfStars={5}
                              starRatedColor="#c5050c" starEmptyColor="#d9dee3"
                              starDimension="0.95rem" starSpacing="0" />
                  </div>
                  {review && <p className="review-text">{review}</p>}
            </li>
      );
}
