import React, { useEffect, useMemo, useRef } from 'react';
import { APIProvider, AdvancedMarker, ControlPosition, Map, useMap } from '@vis.gl/react-google-maps';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocationState } from '../contexts/MapContext';

// Set REACT_APP_GOOGLE_MAPS_API_KEY in frontend/.env.local (see .env.example).
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// Advanced (HTML) markers need a map ID. DEMO_MAP_ID works for local development;
// set REACT_APP_GOOGLE_MAPS_MAP_ID to a real one from the Cloud console to style the map.
const mapId = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

// Fit the map to all pins once, leaving room for the side panel (desktop) or the
// bottom sheet (phones) so no pin starts hidden behind it.
function FitToPins({ pins }) {
    const map = useMap();
    const done = useRef(false);
    useEffect(() => {
        if (!map || done.current || pins.length === 0 || !window.google) return;
        const bounds = new window.google.maps.LatLngBounds();
        pins.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
        const phone = window.innerWidth < 768;
        map.fitBounds(bounds, phone
            ? { top: 60, right: 30, bottom: 40, left: 30 }
            : { top: 70, right: 70, bottom: 50, left: Math.min(window.innerWidth * 0.5, 620) });
        done.current = true;
    }, [map, pins]);
    return null;
}

/**
 * Campus map. Each building gets one pin showing the average rating of its study spots.
 * Pins and the spot list are linked: hovering a spot highlights its pin, and clicking a
 * pin selects that building so the list scrolls to its spots.
 */
export default function BadgerMap() {
    const {
        userLocation, locationList, buildings,
        hoveredBuilding, selectedBuilding, setSelectedBuilding,
    } = useLocationState();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // one entry per building: position, number of spots, review-weighted average rating
    const buildingPins = useMemo(() => buildings.map((b) => {
        const spots = locationList.filter((loc) => loc.building === b.name);
        if (spots.length === 0 || b.latitude == null || b.longitude == null) return null;
        const reviews = spots.reduce((n, s) => n + (s.reviews || 0), 0);
        const rating = reviews
            ? spots.reduce((sum, s) => sum + (s.rating || 0) * (s.reviews || 0), 0) / reviews
            : null;
        return { name: b.name, lat: Number(b.latitude), lng: Number(b.longitude), spots: spots.length, rating };
    }).filter(Boolean), [buildings, locationList]);

    const selectBuilding = (name) => {
        setSelectedBuilding(selectedBuilding === name ? null : name);
        if (pathname !== '/') navigate('/');
    };

    return (
        <APIProvider apiKey={apiKey}>
            <div className="map">
                <Map
                    mapId={mapId}
                    defaultZoom={16}
                    defaultCenter={{ lat: 43.0745, lng: -89.4045 }}
                    reuseMaps={true}
                    // Map/Satellite toggle on the right: the left side is covered by the side panel
                    mapTypeControlOptions={{ position: ControlPosition.TOP_RIGHT }}
                    clickableIcons={false}
                    onClick={() => setSelectedBuilding(null)}
                >
                    <FitToPins pins={buildingPins} />
                    {userLocation && (
                        <AdvancedMarker position={{ lat: Number(userLocation.lat), lng: Number(userLocation.lng) }} title="You are here">
                            <div className="you-pin" />
                        </AdvancedMarker>
                    )}
                    {buildingPins.map((pin) => {
                        const active = pin.name === hoveredBuilding || pin.name === selectedBuilding;
                        return (
                            <AdvancedMarker
                                key={pin.name}
                                position={{ lat: pin.lat, lng: pin.lng }}
                                zIndex={active ? 10 : 1}
                                onClick={() => selectBuilding(pin.name)}
                            >
                                {/* The accessible name is the visible text plus hidden context,
                                    e.g. "Memorial Union, rated ★ 4.0, 2 spots" */}
                                <div className={`rating-pin${active ? ' is-active' : ''}${pin.rating == null ? ' is-unrated' : ''}`}
                                    data-building={pin.name}>
                                    <span className="visually-hidden">{pin.name}, {pin.rating != null ? 'rated ' : ''}</span>
                                    <span className="star">★</span>
                                    {pin.rating != null ? pin.rating.toFixed(1) : 'New'}
                                    {pin.spots > 1 && (
                                        <span className="spots">{pin.spots}<span className="visually-hidden"> spots</span></span>
                                    )}
                                </div>
                            </AdvancedMarker>
                        );
                    })}
                </Map>
            </div>
        </APIProvider>
    );
};
