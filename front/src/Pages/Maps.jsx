import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

function UserLocationMarker({ setUserPosition }) {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = [position.coords.latitude, position.coords.longitude];
        map.setView(userLatLng, 14);
        setPosition(userLatLng)
        setUserPosition(userLatLng);
      },
      (err) => {
        console.error("Unable to retrieve your location", err);
      }
    );
  }, [map, setUserPosition]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

const getDistance = ([lat1, lon1], [lat2, lon2]) =>{
  const toRad = (value) => (value * Math.PI) / 100;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const formatDistance = (km) => {
  return km < 1
    ? `${Math.round(km * 1000)} m`
    : `${km.toFixed(2)} km`;
};


export const NearbyClinics = () => {
  const mapRef = useRef(null)
  const markerRefs = useRef({}); 

  const [userPosition, setUserPosition] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [selectedClinic, setSelectedClinic] = useState(null);

  const fetchClinics = async (radius = 10000) => {
    if (!userPosition) return;
    const [lat, lon] = userPosition;

    // Show SweetAlert loading
    const getZoomLevel = (radius) => {
      if (radius <= 5000) return 14;
      if (radius <= 10000) return 13;
      if (radius <= 15000) return 12;
      if (radius <= 20000) return 11;
      return 10;
    };
    Swal.fire({
      title: 'Loading clinics...',
      html: `Searching within ${radius / 1000} km radius...`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const zoom = getZoomLevel(radius);
    mapRef.current.flyTo([lat, lon], zoom, {
      animate: true,
      duration: 1.2,
    });
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="clinic"](around:${radius},${lat},${lon});
        node["amenity"="hospital"](around:${radius},${lat},${lon});
        node["amenity"="doctors"](around:${radius},${lat},${lon});
        node["amenity"="pharmacy"](around:${radius},${lat},${lon});
      );
      out body;
      >;
      out skel qt;
    `;

    try {
      const res = await axios.post("https://overpass-api.de/api/interpreter", query, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const elements = res.data.elements || [];
      if (elements.length === 0) {
        fetchClinics(radius + 5000);
      } else{
        const clinicsData = elements
          .filter(el => el.lat && el.lon)
          .map((el, idx) => ({
            id: el.id || idx,
            name: el.tags.name || "Unnamed Clinic",
            position: [el.lat, el.lon],
            description: el.tags.amenity || "Clinic/Health service",
            distance: getDistance(userPosition, [el.lat, el.lon]),
            address: el.tags["addr:full"] || null,
            city: el.tags["addr:city"] || null,
            operatorType: el.tags["operator:type"] || null,
            healthcare: el.tags["healthcare"] || null,
            source: el.tags["source"] || null,
          })).sort((a,b) => a.distance - b.distance);
        setClinics(clinicsData);
        Swal.close();
      }
    } catch (err) {
      console.error("Error fetching clinic data", err);
    } finally {
      // Close the SweetAlert loading after the data is fetched
    }
  };
  useEffect(() => {
    if (userPosition) fetchClinics();
  }, [userPosition]);

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-muted/30 p-6 gap-6">
      <Card className="w-full lg:w-[300px] h-[500px]">
        <CardHeader>
          <CardTitle className="text-xl">Nearby Clinics</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search clinics..."
            className="mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ScrollArea className="h-[400px] pr-2">
            <ul className="space-y-2">
              {filteredClinics.map((clinic) => (
                <li
                  key={clinic.id}
                  className="text-sm p-2 border rounded hover:bg-muted cursor-pointer"
                  onClick={() => {
                    setSelectedClinic(clinic)
                    if (mapRef.current){
                      mapRef.current.flyTo(clinic.position, 14, {
                        animate: true,
                        duration: 1.5,
                      });
                    }
                    const marker = markerRefs.current[clinic.id];
                    if (marker) {
                      marker.openPopup();
                    }
                  }}
                >
                  <strong>{clinic.name}</strong>
                  <br />
                  <span className="text-xs text-muted-foreground">{clinic.description} | {formatDistance(clinic.distance)}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="flex-1 w-full h-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Clinic Map</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="absolute bottom-3 right-4 z-[1000]">
            <button
              onClick={() => {
                if (userPosition && mapRef.current) {
                  mapRef.current.flyTo(userPosition, 14, { animate: true, duration: 1.2 });
                }
              }}
              className="bg-white border px-3 py-1 rounded shadow hover:bg-muted transition"
            >
              📍 Center on Me
            </button>
          </div>

          <MapContainer
            ref={mapRef}
            center={userPosition || [0, 0]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-[420px] w-full rounded-lg z-0"
          >
            <UserLocationMarker setUserPosition={setUserPosition} />

            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap Default">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Topographic View">
                <TileLayer
                  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Humanitarian View">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Humanitarian style'
                />
              </LayersControl.BaseLayer>

              {filteredClinics.map((clinic) => (
                <Marker
                  key={clinic.id}
                  position={clinic.position}
                  icon={customIcon}
                  ref={(ref) => {
                    if (ref) markerRefs.current[clinic.id] = ref;
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>{clinic.name}</strong>
                      <br />
                      {clinic.address && <div>{clinic.address}</div>}
                      {clinic.city && <div>📍 {clinic.city}</div>}
                      <div>🏥 {clinic.description}</div>
                      {clinic.healthcare && <div>🩺 Healthcare: {clinic.healthcare}</div>}
                      {clinic.operatorType && <div>🏷️ Operator: {clinic.operatorType}</div>}
                      {clinic.source && <div>🔍 Source: {clinic.source}</div>}
                      <div>📏 {formatDistance(clinic.distance)}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayersControl>

            {userPosition && (
              <Marker position={userPosition}>
                <Popup>You are here</Popup>
              </Marker>
            )}

            {selectedClinic && (
              <Marker position={selectedClinic.position} icon={customIcon}>
                <Popup>
                  <strong>{selectedClinic.name}</strong>
                  <br />
                  {selectedClinic.description}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  );
};
