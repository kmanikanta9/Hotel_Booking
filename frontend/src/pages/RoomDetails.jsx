import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/data/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { axios, getToken, navigate, rooms } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // ✅ Check Availability
  const checkAvailability = async () => {
    try {
      if (checkInDate >= checkOutDate) {
        toast.error("Check-In Date should be less than Check-Out Date");
        return;
      }

      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is Available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not Available");
        }
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Booking Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isAvailable) return checkAvailability();

    try {
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "Pay At Hotel",
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
        scrollTo(0, 0);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Load room from context
  useEffect(() => {
    const selectedRoom = rooms.find((r) => r._id === id);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [rooms, id]);

  if (!room) return null;

  return (
    <div className="pt-28 md:pt-32 px-4 md:px-10 lg:px-20 bg-gray-50 min-h-screen">
      {/* Room Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-playfair text-gray-900">
          {room.hotel.name}{" "}
          <span className="text-base text-gray-500">({room.roomType})</span>
        </h1>
        <p className="text-xs text-white bg-orange-500 px-3 py-1 rounded-full font-medium">
          20% OFF
        </p>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
        <span>⭐ 4.8</span>
        <p className="ml-2">200+ reviews</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-1 mt-2 text-gray-500">
        <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Room Images */}
      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <img
            src={mainImage}
            alt="Room Main"
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 lg:w-1/3">
          {room.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              alt=""
              className={`w-full h-40 object-cover rounded-lg cursor-pointer transition-all ${
                mainImage === img ? "ring-4 ring-orange-400" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-10 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-playfair mb-4 text-gray-800">
            Experience Luxury Like Never Before
          </h2>
          <div className="flex flex-wrap gap-3">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
              >
                <img
                  src={facilityIcons[item] || assets.freeWifiIcon} 
                  alt={item}
                  className="w-5 h-5"
                />
                <p className="text-xs text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl font-semibold text-gray-800 whitespace-nowrap">
          ${room.pricePerNight}/night
        </p>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={onSubmitHandler}
        className="mt-10 bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        {/* Check-In */}
        <div className="flex flex-col flex-1">
          <label htmlFor="checkInDate" className="font-medium text-gray-700">
            Check-In
          </label>
          <input
            type="date"
            id="checkInDate"
            required
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Check-Out */}
        <div className="flex flex-col flex-1">
          <label htmlFor="checkOutDate" className="font-medium text-gray-700">
            Check-Out
          </label>
          <input
            type="date"
            id="checkOutDate"
            required
            disabled={!checkInDate}
            min={checkInDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col flex-1">
          <label htmlFor="guests" className="font-medium text-gray-700">
            Guests
          </label>
          <input
            type="number"
            id="guests"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-24 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 md:w-auto w-full"
        >
          {isAvailable ? "Book Now" : "Check Availability"}
        </button>
      </form>

      {/* Common Details */}
      <div className="mt-16 space-y-6">
        {roomCommonData.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <img src={item.icon} alt="" className="w-6 h-6 mt-1" />
            <div>
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="my-10 border-y border-gray-300 py-8 text-gray-600 max-w-3xl">
        <p>
          Guests will be allocated rooms on the ground floor according to
          availability. You get a comfortable two-bedroom apartment with a true
          city feeling. Prices are for two guests — please select the number of
          guests to get accurate pricing.
        </p>
      </div>

      {/* Host Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={room.hotel.owner.image}
          alt="Host"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">Hosted by {room.hotel.name}</p>
          <button className="mt-3 px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-400 text-white transition">
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
