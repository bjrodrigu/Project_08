import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BadgerMap from "../components/app/BadgerMap";

// Four buildings; B1 has two spots, B4's spot has no reviews.
jest.mock('../components/contexts/MapContext', () => {
    const buildings = [
        { name: 'B1', latitude: 43.071, longitude: -89.401 },
        { name: 'B2', latitude: 43.072, longitude: -89.402 },
        { name: 'B3', latitude: 43.073, longitude: -89.403 },
        { name: 'B4', latitude: 43.074, longitude: -89.404 },
    ];
    const locationList = [
        { name: 'Spot A', building: 'B1', rating: 4, reviews: 1 },
        { name: 'Spot B', building: 'B1', rating: 5, reviews: 3 },
        { name: 'Spot C', building: 'B2', rating: 3, reviews: 2 },
        { name: 'Spot D', building: 'B3', rating: 2, reviews: 1 },
        { name: 'Spot E', building: 'B4', rating: 0, reviews: 0 },
    ];
    const state = {
        userLocation: null, locationList, buildings,
        hoveredBuilding: 'B2', selectedBuilding: null, setSelectedBuilding: jest.fn(),
    };
    return { useLocationState: () => state };
});

jest.mock('@vis.gl/react-google-maps', () => ({
    APIProvider: ({ children }) => <div>{children}</div>,
    ControlPosition: { TOP_RIGHT: 3 },
    useMap: () => null,
    Map: ({ defaultZoom, defaultCenter, children }) => (
        <div data-testid="map" data-zoom={defaultZoom} data-center={`${defaultCenter.lat},${defaultCenter.lng}`}>
            {children}
        </div>
    ),
    AdvancedMarker: ({ position, children }) => (
        <div data-testid="marker" data-position={`${position.lat},${position.lng}`}>{children}</div>
    ),
}));

const renderMap = () => render(<MemoryRouter><BadgerMap /></MemoryRouter>);

test("renders one pin per building", () => {
    renderMap();
    expect(screen.getAllByTestId("marker")).toHaveLength(4);
});

test("pins show the review-weighted average rating", () => {
    renderMap();
    const pin = (name) => document.querySelector(`.rating-pin[data-building="${name}"]`);
    // B1: (4*1 + 5*3) / 4 = 4.75 -> "4.8", with a spot count of 2
    expect(pin("B1")).toHaveTextContent("B1, rated ★4.82 spots");
    expect(pin("B4")).toHaveTextContent("B4, ★New");
});

test("the hovered building's pin is highlighted", () => {
    renderMap();
    expect(document.querySelector('.rating-pin[data-building="B2"]')).toHaveClass("is-active");
    expect(document.querySelector('.rating-pin[data-building="B3"]')).not.toHaveClass("is-active");
});

test("renders map with correct zoom level", () => {
    renderMap();
    expect(screen.getByTestId("map")).toHaveAttribute("data-zoom", "16");
});
