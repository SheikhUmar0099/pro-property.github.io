import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white">Pro</span>
            <span className="text-[#ffa500]">Property</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-white relative group">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#ffa500] transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
          <Link to="/about">
            <li className="text-white relative group">
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#ffa500] transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
        </ul>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit} className="bg-[#ffa500] p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64 text-black placeholder-black placeholder-opacity-75 placeholder-font-semibold placeholder-text-lg"
              style={{ fontWeight: "600", fontSize: "1rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-black" />
            </button>
          </form>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="rounded-full h-10 w-10 object-cover border-2 border-transparent hover:border-[#ffa500] transition duration-300"
              />
            ) : (
              <li className="text-white relative group">
                Sign In
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#ffa500] transition-all duration-300 group-hover:w-full"></span>
              </li>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
