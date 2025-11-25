
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext"; // যদি তোমার auth context থাকে
import img from "../assets/home_nest_vn_logo.jpg";

function Navbar() {
  const { user, logOut } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light"); 

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // save preference
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-3">
          <img
            src={img}
            alt="HomeNest Logo"
            className="w-14 h-14 rounded-full border-2 border-gray-300 object-cover shadow-md"
          />
          <span className="text-2xl font-bold tracking-wide hover:text-gray-500 transition-colors">
            HomeNest
          </span>
        </Link>

        
        <ul className="hidden md:flex gap-6 items-center font-medium">
          <li><Link className="hover:text-gray-500 transition" to="/">Home</Link></li>
          <li><Link className="hover:text-gray-500 transition" to="/all-properties">All Properties</Link></li>
          <li><Link className="hover:text-gray-500 transition" to="/add-property">Add Property</Link></li>
          <li><Link className="hover:text-gray-500 transition" to="/my-properties">My Properties</Link></li>
          <li><Link className="hover:text-gray-500 transition" to="/my-ratings">My Ratings</Link></li>

          
          <li>
            <button
              onClick={toggleTheme}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </li>

          {!user ? (
            <>
              <li><Link className="hover:text-gray-500 transition" to="/login">Login</Link></li>
              <li><Link className="hover:text-gray-500 transition" to="/register">Register</Link></li>
            </>
          ) : (
            <li className="relative">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border-2 border-gray-400"/>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold">
                      {user.displayName ? user.displayName.charAt(0) : "U"}
                    </div>
                  )}
                  <span className="font-medium">{user.displayName || "User"}</span>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-2 text-gray-800">
                  <li className="px-2 py-1 truncate">{user.email}</li>
                  <li>
                    <button onClick={logOut} className="w-full text-left px-2 py-1 hover:bg-red-500 hover:text-white rounded transition">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>

        
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      
      {isOpen && (
        <ul className="md:hidden bg-base-200 px-6 py-4 flex flex-col gap-2">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/all-properties" onClick={toggleMenu}>All Properties</Link></li>
          <li><Link to="/add-property" onClick={toggleMenu}>Add Property</Link></li>
          <li><Link to="/my-properties" onClick={toggleMenu}>My Properties</Link></li>
          <li><Link to="/my-ratings" onClick={toggleMenu}>My Ratings</Link></li>
          {!user ? (
            <>
              <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
              <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
            </>
          ) : (
            <li>
              <button onClick={() => { logOut(); toggleMenu(); }} className="w-full text-left px-2 py-1 hover:bg-red-500 hover:text-white rounded transition mt-1">
                Log Out
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
