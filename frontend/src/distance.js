const EARTH_RADIUS_MILES = 3958.8;
const toRadians = (deg) => (deg * Math.PI) / 180;

// Great-circle ("as the crow flies") distance in miles between two lat/lng points.
export function haversineMiles(lat1, lng1, lat2, lng2) {
      const dLat = toRadians(lat2 - lat1);
      const dLng = toRadians(lng2 - lng1);
      const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
      return 2 * EARTH_RADIUS_MILES * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// "0.4mi", or null when there is no distance to show.
export function formatMiles(distance) {
      return typeof distance === 'number' && Number.isFinite(distance) ? `${distance.toFixed(1)}mi` : null;
}
