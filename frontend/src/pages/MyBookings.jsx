import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const MyBookings = () => {
  const { axios, getToken, user } = useAppContext();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const token = await getToken();
      if (!token) return toast.error("Not authenticated");

      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setBookings(data.bookings);
      else toast.error(data.message || "Failed to fetch bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/bookings/stripe-payment",
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.href = data.url; // redirect to Stripe checkout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();

      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");
      if (sessionId) {
        toast.success("Payment Successful!");
        fetchUserBookings(); // refresh bookings
      }
    }
  }, [user, location.search]);

  return (
    <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-6xl w-full mt-8 text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] border-b border-gray-300 font-medium text-base py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] border-b border-gray-300 py-6"
          >
            <div className="flex flex-col md:flex-row">
              <img
                className="min-md:w-44 rounded shadow object-cover"
                src={booking.room.images[0]}
                alt="Hotel-img"
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="font-playfair text-2xl">
                  {booking.hotel.name} <span className="font-inter text-sm">({booking.room.roomType})</span>
                </p>
                <p className="text-gray-500 text-sm">{booking.hotel.address}</p>
                <p className="text-gray-500 text-sm">Guests: {booking.guests}</p>
                <p className="text-base">Total: ${booking.totalPrice}</p>
              </div>
            </div>

            <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                <p>Check-In:</p>
                <p className="text-gray-500 text-sm">{new Date(booking.checkInDate).toDateString()}</p>
              </div>
              <div>
                <p>Check-Out:</p>
                <p className="text-gray-500 text-sm">{new Date(booking.checkOutDate).toDateString()}</p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center pt-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
                <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>
                  {booking.isPaid ? "Paid" : "Not Paid"}
                </p>
              </div>
              {!booking.isPaid && (
                <button
                  onClick={() => handlePayment(booking._id)}
                  className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
