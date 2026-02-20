"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "./MarkerClusterGroup";
import type { MapBillboard } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

// Fix for default icon issue with Leaflet in React
const defaultIcon = L.icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW4iPjxwYXRoIGQ9Ik0yMCAxMGMwIDYtOCAxMi04IDEycy04LTYtOC0xMiwwLTYgOC02IDggMCA4IDZaIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "text-primary",
});

L.Marker.prototype.options.icon = defaultIcon;

interface InteractiveMapProps {
  billboards: MapBillboard[];
}

export default function InteractiveMap({ billboards }: InteractiveMapProps) {
  const position: L.LatLngExpression = [7.9465, -1.0232]; // Center of Ghana

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {billboards.map((billboard) => (
          <Marker
            key={billboard.id}
            position={[billboard.latitude, billboard.longitude]}
          >
            <Popup>
              <div className="w-64 space-y-2">
                <h3 className="font-headline text-lg font-bold">
                  {billboard.title}
                </h3>
                <p className="text-sm text-muted-foreground">{billboard.city}</p>
                <p className="font-sans text-base font-semibold text-price">
                  GH₵ {billboard.pricePerMonth.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    / month
                  </span>
                </p>
                <Button asChild size="sm" className="w-full">
                  <Link href={`/billboards/${billboard.id}`}>
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
