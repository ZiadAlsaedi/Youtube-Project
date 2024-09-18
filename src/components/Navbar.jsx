import React from 'react'
import { FaYoutube } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState  } from "react";
import { useNavigate } from "react-router-dom";





const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate(`/`);
  };
  return (
    <div className="flex w-full font-sans ">
    <header className="flex  items-center  p-4 shadow fixed w-full z-10 text-white">
      <FiMenu className="ml-5 w-8 h-8 max-sm:hidden " />
      <Link to={"/Home"}>
      <FaYoutube className="ml-10 w-10 h-10 fill-red-600  " />
            </Link>

      <p className="font-medium ml-1"> YouTube</p>
      <form onSubmit={handleSearch} className="flex ml-16 w-[50vw] h-10 border border-gray-200 shadow-sm justify-between rounded-full items-center">
          <input
            type="text"
            placeholder="Search"
            className="h-9 w-full px-4 outline-none rounded-l-full bg-base-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-stone-800 w-16 h-9 text-white rounded-r-full flex items-center justify-center">
            <FaSearch />
          </button>
        </form>
      <div className="bg-stone-800 rounded-full ml-5 w-10 h-10 flex  max-sm:hidden items-center justify-center">
        <FaMicrophone />
      </div>
      <svg
        className="w-8 h-8 ml-10 max-sm:hidden "
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"></path>
      </svg>
      <svg
        className="w-8 h-8 ml-5 "
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path>
      </svg>

 
      <div style={{ position: 'relative' }}>
      <svg
        height="40px"
        width="40px"
        className="ml-5 "
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 461.001 461.001"
        xmlSpace="preserve"
        style={{
          shapeRendering: "geometricPrecision",
          textRendering: "geometricPrecision",
          imageRendering: "optimizeQuality",
          fillRule: "evenodd",
          clipRule: "evenodd",
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <circle cx="230.5" cy="230.5" r="200" fill="#4A249D" />
          <text x="50%" y="50%"  textAnchor="middle" dy=".3em" fontSize="150" fontFamily="Arial" fill="#ffffff">
            Z
          </text>
        </g>
      </svg>
    

      {showMenu && (
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '0',
          backgroundColor: 'primary',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: '1000',
          width:"100px"
        }}>
          <button 
          className="btn hover:bg-red-950"
          onClick={handleLogOut}

           >Log Out</button>
        </div>
      )}
    </div>
    </header>
    
    </div>
      )
}

export default Navbar