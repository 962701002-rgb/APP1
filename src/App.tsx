import { useState, useEffect, useRef, useCallback } from "react";
import { Tag } from "./components/APP1";

interface Listing {
  id: number;
  image: string;
  imageHeight: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  tag?: string;
}

const ALL_LISTINGS: Listing[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=400&h=260&fit=crop&auto=format", imageHeight: 160, name: "Modern City Flat", location: "Lagos Island, Lagos", price: 45000, rating: 4.8, reviews: 124, tag: "Popular" },
  { id: 2, image: "https://images.unsplash.com/photo-1666532937489-331f2f8f4668?w=400&h=360&fit=crop&auto=format", imageHeight: 210, name: "Luxury Loft Suite", location: "Victoria Island, Lagos", price: 78000, rating: 4.9, reviews: 87 },
  { id: 3, image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=400&h=280&fit=crop&auto=format", imageHeight: 175, name: "Cozy Studio Haven", location: "Lekki Phase 1, Lagos", price: 32000, rating: 4.6, reviews: 213 },
  { id: 4, image: "https://images.unsplash.com/photo-1638454795595-0a0abf68614d?w=400&h=320&fit=crop&auto=format", imageHeight: 190, name: "Executive Penthouse", location: "Ikoyi, Lagos", price: 120000, rating: 5.0, reviews: 45, tag: "Top Rated" },
  { id: 5, image: "https://images.unsplash.com/photo-1665249934445-1de680641f50?w=400&h=260&fit=crop&auto=format", imageHeight: 155, name: "Garden Apartment", location: "Ikeja GRA, Lagos", price: 55000, rating: 4.7, reviews: 162 },
  { id: 6, image: "https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?w=400&h=350&fit=crop&auto=format", imageHeight: 220, name: "Warm Wood Retreat", location: "Surulere, Lagos", price: 28000, rating: 4.5, reviews: 308 },
  { id: 7, image: "https://images.unsplash.com/photo-1738168246881-40f35f8aba0a?w=400&h=280&fit=crop&auto=format", imageHeight: 170, name: "Emerald Lounge Flat", location: "Gbagada, Lagos", price: 39000, rating: 4.6, reviews: 91 },
  { id: 8, image: "https://images.unsplash.com/photo-1745429523617-0d837856ca35?w=400&h=300&fit=crop&auto=format", imageHeight: 195, name: "Neutral Chic Condo", location: "Yaba, Lagos", price: 33000, rating: 4.4, reviews: 175, tag: "New" },
  { id: 9, image: "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=400&h=260&fit=crop&auto=format", imageHeight: 160, name: "Stylish Downtown Flat", location: "Marina, Lagos", price: 48000, rating: 4.8, reviews: 203 },
  { id: 10, image: "https://images.unsplash.com/photo-1556593825-c11de986cb0b?w=400&h=340&fit=crop&auto=format", imageHeight: 215, name: "Artisan Duplex", location: "Oniru Estate, Lagos", price: 65000, rating: 4.7, reviews: 68 },
  { id: 11, image: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=400&h=290&fit=crop&auto=format", imageHeight: 180, name: "Sky-View Apartment", location: "Eko Atlantic, Lagos", price: 95000, rating: 4.9, reviews: 33, tag: "Popular" },
  { id: 12, image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=400&h=250&fit=crop&auto=format", imageHeight: 150, name: "Creative Workspace Flat", location: "Ojodu Berger, Lagos", price: 22000, rating: 4.3, reviews: 411 },
  { id: 13, image: "https://images.unsplash.com/photo-1666532937489-331f2f8f4668?w=400&h=310&fit=crop&auto=format", imageHeight: 195, name: "Breezy Corner Suite", location: "Ajah, Lagos", price: 41000, rating: 4.6, reviews: 144 },
  { id: 14, image: "https://images.unsplash.com/photo-1638454795595-0a0abf68614d?w=400&h=270&fit=crop&auto=format", imageHeight: 168, name: "Heritage Terrace", location: "Banana Island, Lagos", price: 150000, rating: 5.0, reviews: 19, tag: "Exclusive" },
  { id: 15, image: "https://images.unsplash.com/photo-1665249934445-1de680641f50?w=400&h=320&fit=crop&auto=format", imageHeight: 200, name: "Serene Window Flat", location: "Anthony Village, Lagos", price: 29500, rating: 4.5, reviews: 267 },
  { id: 16, image: "https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?w=400&h=260&fit=crop&auto=format", imageHeight: 162, name: "Natural Light Studio", location: "Magodo, Lagos", price: 36000, rating: 4.7, reviews: 188 },
  { id: 17, image: "https://images.unsplash.com/photo-1738168246881-40f35f8aba0a?w=400&h=340&fit=crop&auto=format", imageHeight: 210, name: "Green Living Condo", location: "Lekki Phase 2, Lagos", price: 52000, rating: 4.8, reviews: 76 },
  { id: 18, image: "https://images.unsplash.com/photo-1745429523617-0d837856ca35?w=400&h=270&fit=crop&auto=format", imageHeight: 170, name: "Minimal White Flat", location: "Maryland, Lagos", price: 31000, rating: 4.4, reviews: 329 },
  { id: 19, image: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=400&h=300&fit=crop&auto=format", imageHeight: 188, name: "Urban Edge Apartment", location: "Mushin, Lagos", price: 18000, rating: 4.2, reviews: 512, tag: "Budget" },
  { id: 20, image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=400&h=350&fit=crop&auto=format", imageHeight: 220, name: "Executive Twin Suite", location: "Festac Town, Lagos", price: 42000, rating: 4.6, reviews: 103 },
  { id: 21, image: "https://images.unsplash.com/photo-1556593825-c11de986cb0b?w=400&h=260&fit=crop&auto=format", imageHeight: 158, name: "Bohemian Flat", location: "Isale Eko, Lagos", price: 24000, rating: 4.3, reviews: 287 },
  { id: 22, image: "https://images.unsplash.com/photo-1666532937489-331f2f8f4668?w=400&h=290&fit=crop&auto=format", imageHeight: 182, name: "Rooftop Garden Suite", location: "Ogudu GRA, Lagos", price: 73000, rating: 4.9, reviews: 54, tag: "Top Rated" },
  { id: 23, image: "https://images.unsplash.com/photo-1638454795595-0a0abf68614d?w=400&h=330&fit=crop&auto=format", imageHeight: 205, name: "Colonial Charm Apt", location: "Ilupeju, Lagos", price: 37000, rating: 4.5, reviews: 191 },
  { id: 24, image: "https://images.unsplash.com/photo-1665249934445-1de680641f50?w=400&h=265&fit=crop&auto=format", imageHeight: 164, name: "Panorama Heights", location: "Eko Hotel Area, Lagos", price: 88000, rating: 4.8, reviews: 61 },
  { id: 25, image: "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=400&h=300&fit=crop&auto=format", imageHeight: 190, name: "Sleek Studio Loft", location: "Palmgrove, Lagos", price: 27000, rating: 4.4, reviews: 344 },
  { id: 26, image: "https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?w=400&h=345&fit=crop&auto=format", imageHeight: 215, name: "Tranquil Corner Room", location: "Isolo, Lagos", price: 19500, rating: 4.1, reviews: 623 },
  { id: 27, image: "https://images.unsplash.com/photo-1745429523617-0d837856ca35?w=400&h=275&fit=crop&auto=format", imageHeight: 172, name: "Chic Neutral Flat", location: "Ketu, Lagos", price: 23000, rating: 4.3, reviews: 418 },
  { id: 28, image: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=400&h=310&fit=crop&auto=format", imageHeight: 196, name: "Prime Business Flat", location: "Central Business District", price: 60000, rating: 4.7, reviews: 82 },
  { id: 29, image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=400&h=260&fit=crop&auto=format", imageHeight: 160, name: "Compact City Pad", location: "Ebute Metta, Lagos", price: 16000, rating: 4.0, reviews: 755, tag: "Budget" },
  { id: 30, image: "https://images.unsplash.com/photo-1556593825-c11de986cb0b?w=400&h=320&fit=crop&auto=format", imageHeight: 202, name: "The Grand Shortlet", location: "Victoria Island, Lagos", price: 110000, rating: 5.0, reviews: 28, tag: "Exclusive" },
];

const PAGE_SIZE = 10;

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 2.5C3 1.94772 3.44772 1.5 4 1.5H12C12.5523 1.5 13 1.94772 13 2.5V14.5C13 14.7652 12.8946 15.0196 12.7071 15.2071C12.5196 15.3946 12.2652 15.5 12 15.5L8 12.5L4 15.5C3.44772 15.5 3 15.0523 3 14.5V2.5Z"
        fill={filled ? "#6B4EFF" : "none"}
        stroke={filled ? "#6B4EFF" : "white"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function MoreHorizontalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="1.5" fill="#1A1A2E" />
      <circle cx="12" cy="12" r="1.5" fill="#1A1A2E" />
      <circle cx="19" cy="12" r="1.5" fill="#1A1A2E" />
    </svg>
  );
}

function PropertyCard({ listing }: { listing: Listing }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="mb-3 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 break-inside-avoid">
      <div className="relative" style={{ height: listing.imageHeight }}>
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {listing.tag && (
          <div className="absolute top-2.5 left-2.5">
            <Tag
              label={listing.tag}
              variant={
                listing.tag === "Popular" ? "popular"
                : listing.tag === "Top Rated" ? "top-rated"
                : listing.tag === "Exclusive" ? "exclusive"
                : listing.tag === "New" ? "new"
                : listing.tag === "Budget" ? "budget"
                : "default"
              }
            />
          </div>
        )}
        <button
          onClick={() => setFavorited((f) => !f)}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(4px)" }}
        >
          <BookmarkIcon filled={favorited} />
        </button>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[12px] font-bold text-[#1A1A2E] leading-tight truncate">{listing.name}</p>
        <div className="flex items-center gap-0.5 mt-0.5 mb-1.5">
          <LocationIcon />
          <span className="text-[10px] text-gray-500 truncate ml-0.5">{listing.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[13px] font-extrabold" style={{ color: "#6B4EFF" }}>₦{listing.price.toLocaleString()}</span>
            <span className="text-[9px] text-gray-400 font-medium">/night</span>
          </div>
          <div className="flex items-center gap-0.5">
            <StarIcon />
            <span className="text-[10px] font-semibold text-gray-700">{listing.rating}</span>
            <span className="text-[9px] text-gray-400">({listing.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="mb-3 rounded-2xl overflow-hidden bg-white border border-gray-100 break-inside-avoid animate-pulse">
      <div className="bg-gray-200" style={{ height: 170 }} />
      <div className="px-3 py-2.5 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-2.5 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function App() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const allLoaded = visibleCount >= ALL_LISTINGS.length;
  const visibleListings = ALL_LISTINGS.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    if (loading || allLoaded) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, ALL_LISTINGS.length));
      setLoading(false);
    }, 800);
  }, [loading, allLoaded]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen font-sans" style={{ background: "#F5F7FE" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-2" style={{ background: "#F5F7FE" }}>
        <span className="text-[12px] font-semibold text-[#1A1A2E]">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="11" viewBox="0 0 16 11" fill="#1A1A2E"><rect x="0" y="4" width="3" height="7" rx="1"/><rect x="4.5" y="2.5" width="3" height="8.5" rx="1"/><rect x="9" y="0.5" width="3" height="10.5" rx="1"/><rect x="13.5" y="0" width="2" height="11" rx="1"/></svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="#1A1A2E"><path d="M7.5 2.5C9.7 2.5 11.7 3.4 13.1 4.9L14.5 3.5C12.7 1.6 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.6 0.5 3.5L1.9 4.9C3.3 3.4 5.3 2.5 7.5 2.5Z"/><path d="M7.5 5.5C8.9 5.5 10.2 6.1 11.1 7L12.5 5.6C11.2 4.3 9.4 3.5 7.5 3.5C5.6 3.5 3.8 4.3 2.5 5.6L3.9 7C4.8 6.1 6.1 5.5 7.5 5.5Z"/><circle cx="7.5" cy="9.5" r="1.5"/></svg>
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 rounded-sm border border-[#1A1A2E] flex items-center px-0.5">
              <div className="w-4 h-1.5 bg-[#1A1A2E] rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-10" style={{ background: "rgba(245,247,254,0.92)", backdropFilter: "blur(12px)" }}>
        <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
          <BackIcon />
        </button>
        <div className="text-center">
          <h1 className="text-[18px] font-extrabold text-[#1A1A2E] tracking-tight">ALL</h1>
          <p className="text-[10px] text-gray-400 font-medium">{ALL_LISTINGS.length} shortlets available</p>
        </div>
        <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
          <MoreHorizontalIcon />
        </button>
      </div>

      {/* Waterfall grid */}
      <div className="px-3 pt-1 pb-6" style={{ columns: "2", columnGap: "10px" }}>
        {visibleListings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
        {loading && (
          <>
            <LoadingCard />
            <LoadingCard />
          </>
        )}
      </div>

      {/* Sentinel / end state */}
      <div ref={loaderRef} className="flex items-center justify-center py-4 px-6">
        {allLoaded ? (
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-0.5 bg-gray-300 rounded-full" />
            <p className="text-[11px] text-gray-400 font-medium">You've seen all shortlets</p>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-200 animate-spin" style={{ borderTopColor: "#6B4EFF" }} />
        )}
      </div>
    </div>
  );
}
