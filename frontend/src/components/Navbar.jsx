import { useClerk, UserButton } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSignIn } = useClerk();
  const { user, isOwner, setShowHotelReg } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold tracking-widest cursor-pointer"
          >
            LUXURY<span className="text-yellow-400">HOTEL</span>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 text-sm font-medium items-center">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative transition-all duration-300 hover:text-yellow-400 pb-1 ${
                        isActive
                          ? "text-yellow-400 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-yellow-400"
                          : "text-white after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full"
                      } after:transition-all after:duration-300`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Buttons (Desktop) */}
            <div className="flex items-center gap-4">
              <NavLink
                to="/rooms"
                className="border border-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
              >
                Book Now
              </NavLink>

              {user ? (
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Bookings"
                      labelIcon={<BookIcon />}
                      onClick={() => navigate("/my-bookings")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <button
                  onClick={openSignIn}
                  className="bg-yellow-500 text-black px-5 py-2 rounded-full hover:bg-yellow-400 transition"
                >
                  Login
                </button>
              )}

              {user && (
                <button
                  onClick={() =>
                    isOwner ? navigate("/owner") : setShowHotelReg(true)
                  }
                  className="border border-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition text-sm"
                >
                  {isOwner ? "Dashboard" : "List Your Hotel"}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-black/90 text-white md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 text-lg transition ${
                  isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/book"
            onClick={() => setMenuOpen(false)}
            className="mt-3 text-center bg-yellow-500 text-black py-2 rounded-full hover:bg-yellow-400"
          >
            Book Now
          </NavLink>

          {!user && (
            <button
              onClick={() => {
                setMenuOpen(false);
                openSignIn();
              }}
              className="mt-3 text-center border border-yellow-400 py-2 rounded-full hover:bg-yellow-400 hover:text-black"
            >
              Login
            </button>
          )}

          {user && (
            <button
              onClick={() => {
                setMenuOpen(false);
                isOwner ? navigate("/owner") : setShowHotelReg(true);
              }}
              className="mt-3 border border-yellow-400 py-2 rounded-full hover:bg-yellow-400 hover:text-black"
            >
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
