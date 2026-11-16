import React from "react";
import { render, screen } from "@testing-library/react";
import BadgerMap from "../components/app/BadgerMap";


// Four sample spots in four different buildings -> four building markers.
jest.mock('../components/contexts/MapContext', () => {
    const buildings = [
        { name: 'B1', latitude: 43.071, longitude: -89.401 },
        { name: 'B2', latitude: 43.072, longitude: -89.402 },
        { name: 'B3', latitude: 43.073, longitude: -89.403 },
        { name: 'B4', latitude: 43.074, longitude: -89.404 },
    ];
    const locationList = buildings.map((b, i) => ({ name: `Spot ${i}`, building: b.name, tags: [], distance: null }));
    return { useLocationState: () => ({ userLocation: null, locationList, buildings }) };
});

jest.mock('@vis.gl/react-google-maps', () => ({
    APIProvider: ({ children }) => <div>{children}</div>,
    Map: ({ defaultZoom, defaultCenter, children }) => (
        <div data-testid="map" data-zoom={defaultZoom} data-center={`${defaultCenter.lat},${defaultCenter.lng}`}>
            {children}
        </div>
    ),
    Marker: ({ position }) => (
        <div data-testid="marker" data-position={`${position.lat},${position.lng}`} />
    ),
}));

test("renders map with markers", () => {
    render(<BadgerMap />);
    const markers = screen.getAllByTestId("marker");
    expect(markers).toHaveLength(4); // Ensure 4 markers are rendered, change once we fetch study spots from the backend
});

test("renders map with correct zoom level", () => {
    render(<BadgerMap />);
    const mapElement = screen.getByTestId("map");
    expect(mapElement).toHaveAttribute("data-zoom", "16");
});

test("renders map with correct center", () => {
    render(<BadgerMap />);
    const mapElement = screen.getByTestId("map");
    expect(mapElement).toHaveAttribute("data-center", "43.076,-89.404");
});
