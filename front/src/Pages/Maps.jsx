import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = [position.coords.latitude, position.coords.longitude];
        map.setView(userLatLng, 14);
        setUserPosition(userLatLng);
      },
      () => {
        console.error("Unable to retrieve your location");
      }
    );
  }, [map, setUserPosition]);

  return null;
}

export const NearbyClinics = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    const fetchClinics = async () => {
      if (!userPosition) return;
      const [lat, lon] = userPosition;

      // Show SweetAlert loading
      Swal.fire({
        title: 'Loading clinics...',
        text: 'Please wait while we fetch nearby clinics.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="clinic"](around:10000,${lat},${lon});
          node["amenity"="hospital"](around:10000,${lat},${lon});
          node["amenity"="doctors"](around:10000,${lat},${lon});
          node["amenity"="pharmacy"](around:10000,${lat},${lon});
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
          console.log("No clinic data found in the queried area.");
        }
        const clinicsData = elements.map((el, idx) => ({
          id: idx,
          name: el.tags.name || "Unnamed Clinic",
          position: [el.lat, el.lon],
          description: el.tags.amenity || "Clinic/Health service",
        }));
        setClinics(clinicsData);
      } catch (err) {
        console.error("Error fetching clinic data", err);
      } finally {
        // Close the SweetAlert loading after the data is fetched
        Swal.close();
      }
    };

    fetchClinics();
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
                    if (clinic.position) {
                      setUserPosition(clinic.position);
                    }
                  }}
                >
                  <strong>{clinic.name}</strong>
                  <br />
                  <span className="text-xs text-muted-foreground">{clinic.description}</span>
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
        <CardContent>
          <MapContainer
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
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>{clinic.name}</strong>
                      <br />
                      {clinic.description}
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
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  );
};
