import { haversineMiles, formatMiles } from './distance';

test('haversine distance between two campus buildings is about right', () => {
      // Memorial Union -> Computer Sciences is roughly half a mile as the crow flies
      const d = haversineMiles(43.0761, -89.3997, 43.0714, -89.4066);
      expect(d).toBeGreaterThan(0.4);
      expect(d).toBeLessThan(0.55);
});

test('distance to the same point is zero', () => {
      expect(haversineMiles(43.07, -89.4, 43.07, -89.4)).toBe(0);
});

test('formatMiles hides missing distances', () => {
      expect(formatMiles(null)).toBeNull();
      expect(formatMiles(undefined)).toBeNull();
      expect(formatMiles(0.123)).toBe('0.1mi');
});
