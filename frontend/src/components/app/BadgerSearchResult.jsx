import { useContext } from 'react';
import { useNavigate } from 'react-router';
import StarRatings from 'react-star-ratings';
import { useLoginState } from '../contexts/LoginContext';
import { MapContext } from '../contexts/MapContext';
import { formatMiles } from "../../distance";

// One study spot in the search list. The whole row is clickable; the spot name is
// the real button so it also works from the keyboard and reads as a heading.
export default function BadgerSearchResult({ location, isFavorite, favoriteId, onFavoriteChange }) {
      const navigate = useNavigate();
      const { login } = useLoginState();
      // optional: the row still renders outside the map provider (e.g. in tests)
      const map = useContext(MapContext) || {};
      const highlighted = !!location.building &&
            (map.hoveredBuilding === location.building || map.selectedBuilding === location.building);

      const openSpot = () => navigate('../location', { state: location });

      const handleFavorite = () => {
            if (isFavorite) {
                  onFavoriteChange(location.name, false, favoriteId);
            } else {
                  onFavoriteChange(location.name, true);
            }
      };

      const reviews = location.reviews || 0;
      const distance = formatMiles(location.distance);

      return (
            <li
                  className={`spot-row${highlighted ? ' is-highlighted' : ''}`}
                  data-building={location.building}
                  onClick={openSpot}
                  onMouseEnter={() => map.setHoveredBuilding && map.setHoveredBuilding(location.building)}
                  onMouseLeave={() => map.setHoveredBuilding && map.setHoveredBuilding(null)}
            >
                  <div className="spot-row-top">
                        <h3 className="spot-name">
                              <button type="button" onClick={(e) => { e.stopPropagation(); openSpot(); }}>
                                    {location.name}
                              </button>
                        </h3>
                        {distance && <span className="spot-distance">{distance}</span>}
                        {login && (
                              <div className="spot-fav" onClick={(e) => e.stopPropagation()}
                                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                                    <StarRatings
                                          rating={isFavorite ? 1 : 0}
                                          starRatedColor="#c5050c"
                                          starHoverColor="#c5050c"
                                          starEmptyColor="#cfd6dc"
                                          numberOfStars={1}
                                          changeRating={handleFavorite}
                                          starDimension="22px"
                                          starSpacing="0"
                                          name="favorite"
                                    />
                              </div>
                        )}
                  </div>

                  <div className="spot-meta">
                        {reviews > 0 ? (
                              <span className="spot-rating">
                                    <StarRatings rating={Number(location.rating) || 0} numberOfStars={5}
                                          starRatedColor="#c5050c" starEmptyColor="#d9dee3"
                                          starDimension="0.95rem" starSpacing="0" />
                                    {Number(location.rating || 0).toFixed(1)}
                                    <span className="count">({reviews} review{reviews === 1 ? '' : 's'})</span>
                              </span>
                        ) : (
                              <span>No reviews yet</span>
                        )}
                        {location.building && <span>{location.building}</span>}
                  </div>

                  {location.description && <p className="spot-description">{location.description}</p>}

                  {location.tags && location.tags.length > 0 && (
                        <div className="spot-tags">
                              {location.tags.map((tag) => <span className="spot-tag" key={tag}>{tag}</span>)}
                        </div>
                  )}
            </li>
      );
}
