import React, { useState, useMemo } from "react";
import { assets, facilityIcons } from "../assets/data/assets";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Added

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();

  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
  const sortOptions = ["Price - Low to High", "Price - High to Low", "Newest First"];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) updated[type].push(value);
      else updated[type] = updated[type].filter((item) => item !== value);
      return updated;
    });
  };

  const handleSortChange = (sortOption) => setSelectedSort(sortOption);

  const matchRoomType = (room) =>
    selectedFilters.roomType.length === 0 ||
    selectedFilters.roomType.includes(room.roomType);

  const matchesPriceRange = (room) =>
    selectedFilters.priceRange.length === 0 ||
    selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(" to ").map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });

  const sortRooms = (a, b) => {
    if (selectedSort === "Price - Low to High") return a.pricePerNight - b.pricePerNight;
    if (selectedSort === "Price - High to Low") return b.pricePerNight - a.pricePerNight;
    if (selectedSort === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  const filteredRooms = useMemo(
    () =>
      rooms
        .filter(
          (room) =>
            matchRoomType(room) && matchesPriceRange(room) && filterDestination(room)
        )
        .sort(sortRooms),
    [rooms, selectedFilters, selectedSort, searchParams]
  );

  const clearFilter = () => {
    setSelectedFilters({ roomType: [], priceRange: [] });
    setSelectedSort("");
    setSearchParams({});
  };

  return (
    <motion.div
      className="pt-24 px-4 md:px-10 flex flex-col md:flex-row gap-10 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Section: Rooms */}
      <div className="flex-1">
        <motion.div
          className="text-left mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair text-3xl md:text-4xl text-gray-800">
            Hotel Rooms
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Explore our wide selection of comfortable and affordable rooms designed
            for every traveler. Book your perfect stay today!
          </p>
        </motion.div>

        <AnimatePresence>
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <motion.div
                key={room._id}
                className="flex flex-col md:flex-row gap-6 py-6 border-b border-gray-300 last:border-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  src={room.images[0] }
                  alt="hotel-img"
                  title="View Room Details"
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="w-full md:w-1/2 h-56 object-cover rounded-lg shadow-md cursor-pointer"
                />
                <div className="md:w-1/2 flex flex-col gap-2">
                  <p className="text-gray-500 text-sm">{room.hotel.city}</p>
                  <h2
                    className="text-2xl font-semibold text-gray-800 cursor-pointer"
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      scrollTo(0, 0);
                    }}
                  >
                    {room.hotel.name}
                  </h2>

                  <div className="flex items-center text-gray-500 text-sm">
                    <img src={assets.locationIcon} alt="" className="w-4 h-4 mr-1" />
                    <span>{room.hotel.address}</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3">
                    {room.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center"
                      >
                        <img src={facilityIcons[item] || assets.freeWifiIcon} alt={item} className="w-5 h-5" />
                        <p className="text-xs">{item}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xl font-medium text-gray-700 mt-4">
                    {currency} {room.pricePerNight} / night
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No rooms found for the selected filters.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Right Section: Filters */}
      <motion.aside
        className="w-full md:w-80 bg-white border border-gray-300 rounded-lg shadow-sm h-fit sticky top-24"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
          <p className="text-base font-medium text-gray-800">Filters</p>
          <button
            onClick={clearFilter}
            className="text-xs text-blue-600 hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="font-medium text-gray-800 pb-2">Room Type</p>
          {roomTypes.map((room, index) => (
            <CheckBox
              key={index}
              label={room}
              selected={selectedFilters.roomType.includes(room)}
              onChange={(checked) => handleFilterChange(checked, room, "roomType")}
            />
          ))}
        </div>

        <div className="px-5 py-4 border-t border-gray-200">
          <p className="font-medium text-gray-800 pb-2">Price Range</p>
          {priceRanges.map((range, index) => (
            <CheckBox
              key={index}
              label={`${currency} ${range}`}
              selected={selectedFilters.priceRange.includes(range)}
              onChange={(checked) => handleFilterChange(checked, range, "priceRange")}
            />
          ))}
        </div>

        <div className="px-5 py-4 border-t border-gray-200">
          <p className="font-medium text-gray-800 pb-2">Sort By</p>
          {sortOptions.map((option, index) => (
            <RadioButton
              key={index}
              label={option}
              selected={selectedSort === option}
              onChange={() => handleSortChange(option)}
            />
          ))}
        </div>
      </motion.aside>
    </motion.div>
  );
};

export default AllRooms;
