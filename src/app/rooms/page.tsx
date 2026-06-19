"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BookingModal from "@/components/BookingModal";

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string;
  amenities: string;
  capacity: number;
  _count?: { favorites: number };
  reviews?: { rating: number }[];
}

export default function RoomsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetch("/api/rooms")
      .then((r) => r.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    if (session) {
      fetch("/api/favorites")
        .then((r) => r.json())
        .then((data) => {
          setFavorites(new Set(data.map((f: any) => f.roomId)));
        })
        .catch(() => {});
    }
  }, [session]);

  const toggleFavorite = async (roomId: string) => {
    if (!session) { router.push("/login"); return; }
    const isFav = favorites.has(roomId);
    try {
      await fetch("/api/favorites", {
        method: isFav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      setFavorites((prev) => {
        const next = new Set(prev);
        isFav ? next.delete(roomId) : next.add(roomId);
        return next;
      });
    } catch {}
  };

  const avgRating = (room: Room) => {
    if (!room.reviews?.length) return 0;
    return room.reviews.reduce((s, r) => s + r.rating, 0) / room.reviews.length;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF3E0]">Loading rooms...</div>;

  return (
    <div className="min-h-screen bg-[#FAF3E0] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1A4B7A] mb-3">Our Suites</h1>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Each room is a love letter to the Amalfi Coast — handcrafted details, sweeping sea views, and the kind of light that makes you forget to check your phone.
          </p>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-playfair text-xl text-gray-500">No rooms available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${JSON.parse(room.images || '[]')[0] || "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop"})` }}
                  />
                  <button
                    onClick={() => toggleFavorite(room.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Toggle favorite"
                  >
                    <svg className={`w-5 h-5 ${favorites.has(room.id) ? "text-[#C75B39] fill-current" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.364-1.364a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-playfair text-xl font-bold text-[#1A4B7A]">{room.name}</h3>
                    <span className="text-[#E8A435] font-bold text-lg">€{room.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{room.description}</p>

                  <div className="flex items-center gap-2 mb-4">
                    {avgRating(room) > 0 ? (
                      <>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className={`star-${s <= Math.round(avgRating(room)) ? "filled" : "empty"}`} style={{ fontSize: "14px" }}>
                              {s <= Math.round(avgRating(room)) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({room.reviews?.length})</span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">No reviews yet</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(() => {
                      try {
                        const amenities = JSON.parse(room.amenities || "[]");
                        return amenities.slice(0, 3).map((a: string, i: number) => (
                          <span key={i} className="text-xs bg-[#FAF3E0] text-gray-600 px-2 py-1 rounded-full">{a}</span>
                        ));
                      } catch { return null; }
                    })()}
                    <span className="text-xs bg-[#FAF3E0] text-gray-600 px-2 py-1 rounded-full">Up to {room.capacity} guests</span>
                  </div>

                  <button
                    onClick={() => session ? setBookingRoom(room) : router.push("/login")}
                    className="w-full bg-[#C75B39] text-[#FAF3E0] py-3 rounded-lg font-medium hover:bg-[#C75B39]/90 transition-all"
                  >
                    {session ? "Book Now" : "Sign In to Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BookingModal isOpen={!!bookingRoom} onClose={() => setBookingRoom(null)} room={bookingRoom} />
    </div>
  );
}
