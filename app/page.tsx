 "use client";

import { useMemo, useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

type CategoryId = "snooker" | "padel" | "cricket" | "futsal" | "table-tennis";

const darkNeonMapStyles: google.maps.MapTypeStyle[] = [
  {
    elementType: "geometry",
    stylers: [{ color: "#111111" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#a3a3a3" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2933" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#18181b" }],
  },
];

const categories: { id: CategoryId; label: string }[] = [
  { id: "snooker", label: "Snooker Clubs" },
  { id: "padel", label: "Padel Court" },
  { id: "cricket", label: "Indoor Cricket Turf" },
  { id: "futsal", label: "Futsal Arena" },
  { id: "table-tennis", label: "Table Tennis" },
];

const center = { lat: 25.2048, lng: 55.2708 };

const clubsData = [
  {
    id: "1",
    name: "Neon Padel Hub",
    category: "padel" as const,
    position: { lat: 25.211, lng: 55.275 },
    address: "Al Wasl Road, Dubai",
    rating: 4.8,
    hours: "10:00 – 23:00",
    distance: "1.2 km",
  },
  {
    id: "2",
    name: "Downtown Snooker Lounge",
    category: "snooker" as const,
    position: { lat: 25.198, lng: 55.272 },
    address: "Downtown Boulevard, Dubai",
    rating: 4.6,
    hours: "12:00 – 02:00",
    distance: "2.1 km",
  },
  {
    id: "3",
    name: "Skyline Futsal Arena",
    category: "futsal" as const,
    position: { lat: 25.195, lng: 55.283 },
    address: "Business Bay, Dubai",
    rating: 4.7,
    hours: "09:00 – 01:00",
    distance: "3.0 km",
  },
  {
    id: "4",
    name: "City Indoor Cricket Turf",
    category: "cricket" as const,
    position: { lat: 25.215, lng: 55.263 },
    address: "Sheikh Zayed Road, Dubai",
    rating: 4.5,
    hours: "11:00 – 23:00",
    distance: "4.4 km",
  },
  {
    id: "5",
    name: "Metro Table Tennis Club",
    category: "table-tennis" as const,
    position: { lat: 25.205, lng: 55.29 },
    address: "Dubai Marina",
    rating: 4.4,
    hours: "10:00 – 22:00",
    distance: "5.0 km",
  },
];

type Club = (typeof clubsData)[number] & {
  categoryLabel: string;
};
export default function HomePage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [activeCategory, setActiveCategory] = useState<CategoryId>("padel");
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | undefined>();

  const filteredClubs = useMemo<Club[]>(() => {
    const label =
      categories.find((category) => category.id === activeCategory)?.label ??
      "";

    return clubsData
      .filter((club) => club.category === activeCategory)
      .map((club) => ({
        ...club,
        categoryLabel: label,
      }));
  }, [activeCategory]);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* Map background */}
      <div className="absolute inset-0">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={center}
              defaultZoom={11}
              mapTypeId="roadmap"
              styles={darkNeonMapStyles}
              disableDefaultUI
              clickableIcons={false}
              gestureHandling="greedy"
              style={{ width: "100%", height: "100%" }}
            >
              {filteredClubs.map((club) => (
                <AdvancedMarker
                  key={club.id}
                  position={club.position}
                  onClick={() => setSelectedClub(club)}
                >
                  <Pin
                    background="#ec4899"
                    borderColor="#f9a8d4"
                    glyphColor="#0f172a"
                  />
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900">
            <p className="text-sm text-slate-300">
              Set <code className="text-pink-300">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in
              <span className="font-semibold"> website/.env.local</span> to load the map.
            </p>
          </div>
        )}
      </div>

      {/* Top navigation overlay */}
      <header className="pointer-events-none relative z-10 px-4 py-4 sm:px-8">
        <div className="pointer-events-auto flex items-center justify-between rounded-full bg-black/80 px-4 py-3 text-xs shadow-2xl shadow-black/80 ring-1 ring-slate-900 sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="logo-text text-lg font-semibold uppercase tracking-[0.22em] text-white sm:text-xl">
              BUKIT
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-full bg-neutral-900 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-100 shadow-lg shadow-black/60 sm:flex">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedClub(undefined);
              }}
              className={`rounded-full px-4 py-1.5 transition ${
                activeCategory === category.id
                  ? "bg-pink-500 text-black shadow shadow-pink-500/60"
                  : "text-slate-200 hover:bg-slate-800/80"
              }`}
            >
              {category.label}
            </button>
          ))}
          </nav>

          <div className="flex items-center gap-2">
          <button
            type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-[0.7rem] text-white shadow-lg shadow-black/70 ring-1 ring-slate-700 sm:h-9 sm:w-9"
          >
            🔔
          </button>
          <button
            type="button"
              className="flex h-8 w-8 flex-col items-center justify-center rounded-full bg-neutral-900 text-[0.55rem] font-semibold uppercase tracking-wide text-slate-200 shadow-lg shadow-black/70 ring-1 ring-slate-700 sm:h-9 sm:w-9"
          >
            ☰
          </button>
          </div>
        </div>
      </header>

      {/* Club info card overlay */}
      {selectedClub && (
        <div className="pointer-events-none relative z-10 flex justify-start px-4 sm:px-8">
          <div className="pointer-events-auto mt-2 max-w-xs rounded-2xl bg-slate-950/90 p-3 text-xs text-slate-100 shadow-xl shadow-black/70 ring-1 ring-slate-800 sm:mt-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-pink-300">
              {selectedClub.categoryLabel}
            </p>
            <h2 className="mt-1 text-sm font-semibold text-white">
              {selectedClub.name}
            </h2>
            <p className="mt-1 text-[0.7rem] text-slate-300">
              {selectedClub.address}
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-400">
              Today · {selectedClub.hours}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[0.7rem] text-yellow-300">
                ★ {selectedClub.rating.toFixed(1)}
              </span>
              <button
                type="button"
                className="rounded-full bg-pink-500 px-3 py-1 text-[0.7rem] font-semibold text-white hover:bg-pink-400"
              >
                Book this club
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom show list button */}
      <div className="pointer-events-none relative z-10 flex items-end justify-center pb-6 pt-10 sm:pb-8">
        <button
          type="button"
          onClick={() => setIsListOpen((open) => !open)}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-xl shadow-pink-500/50 hover:bg-pink-400"
        >
          {isListOpen ? "Hide club list" : "Show club list"}
        </button>
      </div>

      {/* Bottom list drawer */}
      {isListOpen && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-4">
          <div className="pointer-events-auto max-h-52 w-full max-w-xl overflow-y-auto rounded-2xl bg-slate-950/95 p-3 text-xs text-slate-100 shadow-2xl shadow-black/80 ring-1 ring-slate-800">
            {filteredClubs.map((club) => (
              <button
                key={club.id}
                type="button"
                onClick={() => setSelectedClub(club)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                  selectedClub?.id === club.id
                    ? "bg-pink-500/15"
                    : "hover:bg-slate-800/80"
                }`}
              >
                <div>
                  <p className="text-[0.7rem] font-semibold text-slate-100">
                    {club.name}
                  </p>
                  <p className="text-[0.65rem] text-slate-400">
                    {club.categoryLabel} · {club.distance}
                  </p>
                </div>
                <span className="text-[0.7rem] text-yellow-300">
                  ★ {club.rating.toFixed(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
