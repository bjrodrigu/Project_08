import StarRatings from 'react-star-ratings';

const formatDate = (value) => {
      const d = value ? new Date(value) : null;
      return d && !isNaN(d) ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : null;
};

// One review in a spot's review list: title, rating, comment, author and date.
export default function BadgerReview({ name, rating, review, author, date }) {
      const when = formatDate(date);
      return (
            <li className="review-row">
                  <div className="review-top">
                        <h3 className="review-title">{name}</h3>
                        <StarRatings rating={Number(rating) || 0} numberOfStars={5}
                              starRatedColor="#c5050c" starEmptyColor="#d9dee3"
                              starDimension="0.95rem" starSpacing="0" />
                  </div>
                  {review && <p className="review-text">{review}</p>}
                  {(author || when) && (
                        <p className="review-byline">
                              {author || 'Anonymous'}
                              {when && <time dateTime={new Date(date).toISOString()}>{when}</time>}
                        </p>
                  )}
            </li>
      );
}
