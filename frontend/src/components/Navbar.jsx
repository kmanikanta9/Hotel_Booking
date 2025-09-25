import { useClerk, useUser,UserButton } from "@clerk/clerk-react";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('/home');
  const [roomsOpen, setRoomsOpen] = useState(false); // dropdown for Rooms
  const closeTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {openSignIn} =useClerk()
  const {user} = useUser()

  const handleNavScroll = (sectionId, e, opts = {}) => {
    // opts.closeMenu: whether to close mobile menu
    if (e && e.preventDefault) e.preventDefault();
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(`/${sectionId}`);
      }
    };
    // if (location.pathname === '/') {
    //   doScroll();
    // } else {
    //   // navigate to home and pass state so Home page can scroll after mount
    //   navigate('/', { state: { scrollTo: sectionId } });
    // }

    if (opts.closeMenu) setMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    // Set initial active link from pathname if present
    if (window && window.location && window.location.pathname) {
      setActive(window.location.pathname === '/' ? '/' : window.location.pathname);
    }
  }, []);

  // Update active link based on scroll position
  useEffect(() => {
    const ids = ['home', 'rooms', 'blog', 'about', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // set active to a pathname-style value (e.g. '/rooms') so it matches NavLink routes
            setActive(`/${entry.target.id}`);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.6 }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  // Close rooms dropdown on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setRoomsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="absolute w-full z-30 bg-black/30 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-2xl md:text-2xl  tracking-widest text-white">LUXURYHOTEL</h1>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 text-white font-medium items-center">
              <li>
                <NavLink to="/" className={() => `nav-underline curved-underline hover:text-yellow-400 ${active === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>Home</NavLink>
              </li>
              <li className="relative"
                onMouseEnter={() => {
                  if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
                  setRoomsOpen(true);
                }}
                onMouseLeave={() => {
                  // give a tiny delay so cursor movement to panel doesn't close it
                  closeTimeout.current = setTimeout(() => setRoomsOpen(false), 150);
                }}
              >
                <button
                  className={`flex items-center space-x-2 px-2 py-1 rounded-md transition-colors duration-200 ${roomsOpen ? 'bg-yellow-50 text-yellow-600' : 'hover:bg-white/10 hover:text-yellow-400'} focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 ${active === '#rooms' ? 'border-b-2 border-yellow-400 pb-1' : ''}`}
                  aria-expanded={roomsOpen}
                  onClick={() => setRoomsOpen((v) => !v)}
                  onFocus={() => setRoomsOpen(true)}
                >
                  <span>Rooms</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>

                {/* Dropdown - desktop */}
                <div
                  className={`absolute left-0 top-full -mt-1 w-56 bg-white text-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 z-50 ${roomsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                  onMouseEnter={() => { if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; } setRoomsOpen(true); }}
                  onMouseLeave={() => { closeTimeout.current = setTimeout(() => setRoomsOpen(false), 150); }}
                  role="menu"
                  aria-hidden={!roomsOpen}
                >
                  <ul className="py-2">
                    <li>
                      <NavLink to="/room-videos" className="block px-4 py-3 rounded-md hover:bg-gray-50 hover:text-yellow-600 transition ease-out duration-200 transform hover:-translate-y-0.5" onClick={() => { setActive('/rooms'); setRoomsOpen(false); }}>
                        Room Videos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/presidential" className="block px-4 py-3 rounded-md hover:bg-gray-50 hover:text-yellow-600 transition ease-out duration-200 transform hover:-translate-y-0.5" onClick={() => { setActive('/rooms'); setRoomsOpen(false); }}>
                        Presidential Room
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/luxury" className="block px-4 py-3 rounded-md hover:bg-gray-50 hover:text-yellow-600 transition ease-out duration-200 transform hover:-translate-y-0.5" onClick={() => { setActive('/rooms'); setRoomsOpen(false); }}>
                        Luxury Room
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/deluxe" className="block px-4 py-3 rounded-md hover:bg-gray-50 hover:text-yellow-600 transition ease-out duration-200 transform hover:-translate-y-0.5" onClick={() => { setActive('/rooms'); setRoomsOpen(false); }}>
                        Deluxe Room
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/blog" className={({ isActive }) => `nav-underline curved-underline hover:text-yellow-400 ${isActive || active === '/blog' ? 'active' : ''}`} onClick={() => navigate('/blog')}>Blog</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-underline curved-underline hover:text-yellow-400 ${isActive || active === '/about' ? 'active' : ''}`} onClick={() => navigate('/about')}>About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-underline curved-underline hover:text-yellow-400 ${isActive || active === '/about' ? 'active' : ''}`} onClick={() => navigate('/contact')}>Contact</NavLink>
              </li>
            </ul>

            <NavLink  to="/book" className="inline-block border px-4 py-2 text-white hover:bg-yellow-400 hover:text-black transition">Book Now</NavLink>
                {
                  user? (<UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action label = 'My Bookings' labelIcon={<BookIcon/>} onClick={()=>navigate('/my-bookings')}/>
                    </UserButton.MenuItems>
                  </UserButton>): (<button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">Login</button>)
                }
            
          </div>

          {/* Mobile controls */}
          <div className="flex items-center md:hidden">
            <button
              className="p-2 text-white"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile panel (absolute so it doesn't push layout) */}
      <div
  className={`absolute top-full left-0 w-full z-50 ${
    menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
  } md:hidden transition-all duration-200 ease-in-out`}
>
  <div className="bg-black/90 text-white px-3 py-4">
    <ul className="flex flex-col gap-2 w-full">
      {/* Home */}
      <li>
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `block w-full text-left text-lg py-3 px-3 rounded ${isActive || active === "/" ? "underline decoration-yellow-400" : "hover:bg-white/5"}`
          }
        >
          Home
        </NavLink>
      </li>

      {/* Rooms (expandable) */}
      <li>
        <button
          onClick={() => setRoomsOpen((v) => !v)}
          aria-expanded={roomsOpen}
          className={`w-full flex items-center justify-between text-left text-lg py-3 px-3 rounded hover:bg-white/5`}
        >
          <span>Rooms</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${roomsOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {roomsOpen && (
          <ul className="mt-2 flex flex-col gap-1 pl-4">
            <li>
              <NavLink
                to="/room-videos"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left py-2 px-2 rounded hover:bg-white/5"
              >
                Room Videos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/presidential"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left py-2 px-2 rounded hover:bg-white/5"
              >
                Presidential Room
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/luxury"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left py-2 px-2 rounded hover:bg-white/5"
              >
                Luxury Room
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/deluxe"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left py-2 px-2 rounded hover:bg-white/5"
              >
                Deluxe Room
              </NavLink>
            </li>
          </ul>
        )}
      </li>

      {/* Other links */}
      {[
        { to: "/blog", label: "Blog" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
      ].map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block w-full text-left text-lg py-3 px-3 rounded ${isActive || active === link.to ? "underline decoration-yellow-400" : "hover:bg-white/5"}`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}

      {/* Book Now */}
      <li>
        <NavLink
          to="/book"
          onClick={() => setMenuOpen(false)}
          className="block w-full text-center bg-yellow-500 text-black py-3 px-3 rounded"
        >
          Book Now
        </NavLink>
      </li>

      {/* Login */}
      <li className="flex justify-center">
  {!user && <button
    onClick={() => {
      setMenuOpen(false);
      openSignIn();
    }}
    className="bg-black text-white px-6 py-2 rounded-full text-center hover:bg-gray-800 transition
               max-w-xs w-full sm:w-auto"
  >
    Login
  </button>}
</li>

    </ul>
  </div>
</div>

    </header>
  );
};

export default Navbar;
