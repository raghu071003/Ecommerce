import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SmallProduct from './smallProduct'; // Ensure the path matches your file structure
import { useAuth } from '../Context/AuthContext';
import logo from "../assets/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { isLogged, setIsLoggedIn } = useAuth();

  // Fetch data whenever the query changes
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setData([]);
        setShowSearchResults(false);
        return;
      }
      setShowSearchResults(true);
      try {
        const res = await axios.get(`https://aniclothing.onrender.com/api/v1/user/search/${query}`);
        setData(res.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, setIsLoggedIn]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
      setShowSearchResults(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("https://aniclothing.onrender.com/api/v1/user/logout", {}, { withCredentials: true });
      if (res.data.statusCode === 200) {
        localStorage.removeItem('authStatus');
        localStorage.removeItem('cartItem');
        navigate("/login");
        setShowSearchResults(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleUser = () => {
    if (isLogged) {
      setUserMenu(!userMenu);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 relative m-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={logo} alt="Logo" className='w-16' />
              <p className='absolute top-6 left-4 text-white cur-font font-bold text-xl'>AniClothing</p>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Home</NavLink>
                <NavLink to="/categories" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Categories</NavLink>
                <NavLink to="/design" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Design</NavLink>
                <NavLink to="/contact" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Contact</NavLink>
              </div>
            </div>
          </div>
          {/* Search bar for larger screens */}
          <div className="hidden md:block relative">
            <div className="ml-4 flex items-center md:ml-6 relative">
              <input
                type="text"
                className='rounded-l-xl h-8 w-56 px-3 outline-none'
                onChange={handleChange}
                value={query}
                placeholder="Search..."
                onFocus={() => setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              <button onClick={handleSearch}>
                <Search className='h-8 w-8 bg-white rounded-r-xl p-1 mr-3' />
              </button>
              {showSearchResults && (
                <div className="absolute bg-white rounded-xl shadow-lg mt-2 w-full max-w-xs top-14 p-3 z-50">
                  {data && data.data && data.data.length > 0 ? (
                    data.data.slice(0, 5).map((item) => (
                      <SmallProduct
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image[0]}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No Results Found</p>
                  )}
                </div>
              )}
              <button className="p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button
                className="ml-3 p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                onClick={handleUser}
              >
                <User className="h-6 w-6" />
              </button>
              {isLogged && userMenu && (
                <div className='absolute bg-gray-800 right-0 top-14 text-white p-3 rounded-xl flex flex-col items-center justify-center gap-3 z-20'>
                  <NavLink to="/profile" className='text-xl border-b' onClick={() => navigate("/profile")}>Profile</NavLink>
                  <NavLink to="#" className='text-xl border-b' onClick={handleLogout}>Logout</NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-orange-400 hover:border-b border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden z-10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Home</NavLink>
            <NavLink to="/categories" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Categories</NavLink>
            <NavLink to="/design" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Design</NavLink>
            <NavLink to="/contact" className="text-white hover:border-b border-orange-400 px-3 py-2 text-sm font-medium">Contact</NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 relative">
              {/* Search input for smaller screens */}
              <input
                type="text"
                className='rounded-xl h-8 w-full px-3 outline-none'
                onChange={handleChange}
                value={query}
                placeholder="Search..."
                onFocus={() => setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              <button onClick={handleSearch}>
                <Search className='h-8 w-8 bg-white rounded-xl p-1 mr-3' />
              </button>
              {showSearchResults && (
                <div className="absolute bg-white rounded-xl shadow-lg mt-2 w-full max-w-xs top-14 p-3 z-50">
                  {data && data.data && data.data.length > 0 ? (
                    data.data.slice(0, 5).map((item) => (
                      <SmallProduct
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image[0]}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No Results Found</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center px-5 relative mt-2">
              <button className="ml-auto p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="ml-4 p-1 rounded-full text-white hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white" onClick={handleUser}>

                <User className="h-6 w-6" />
              </button>
              {userMenu && (
                <div className='absolute bg-gray-800 right-0 top-14 text-white p-3 rounded-xl gap-3 flex flex-col'>
                  <NavLink to="/profile" className='text-xl border-b' onClick={() => navigate("/profile")}>Profile</NavLink>
                  <NavLink to="#" className='text-xl border-b' onClick={handleLogout}>Logout</NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
