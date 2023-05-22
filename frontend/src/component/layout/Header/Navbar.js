import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../../images/logo.png";
import { useHistory } from "react-router-dom";

function Navbar() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className="flex flex-wrap place-items-center header sticky top-0 list-none z-50">
        <section className="relative mx-auto w-full">
          {/* <!-- navbar --> */}
          <nav className="flex justify-between bg-gray-900 text-white">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              {isAuthenticated ? (
                <DehazeIcon onClick={toggleSidebar} />
              ) : (
                <a
                  className="text-3xl font-bold font-heading ml-2 bg-white"
                  href="/"
                >
                  <img className="h-9" src={logo} alt="logo" />
                </a>
              )}

              {/* <!-- Nav Links --> */}
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 ">
                <Link to={"/"}>
                  <li className="hover:text-gray-200">Home</li>
                </Link>{" "}
                {/* <li>
                  <a className="hover:text-gray-200" href="#">
                    Catagory
                  </a>
                </li> */}
                <Link to={"/products"}>
                  <li className="hover:text-gray-200">Products</li>
                </Link>{" "}
                <Link to={"/about"}>
                  <li className="hover:text-gray-200">AboutUs</li>
                </Link>{" "}
                <div className="flex items-center">
                  <input
                    type="text"
                    value={keyword}
                    className="py-0 px-4 text-gray-500 text-sm font-thin border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 rounded-l-md"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-0 px-2 rounded-r-md focus:outline-none"
                    onClick={searchSubmitHandler}
                  >
                    <SearchIcon className="w-2 h-2" />
                  </button>
                </div>
              </ul>

              {/* <!-- Header Icons --> */}
              <div className="hidden xl:flex items-center space-x-5 items-center">
                {/* Use this for wishList items */}
                {/* <a className="hover:text-gray-200" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                     strokeWidth ="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </a> */}
                <Link to={"/cart"}>
                  <li className="flex items-center hover:text-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {/* Project present in cart */}
                    {cartItems.length > 0 ? (
                      <span className="flex absolute -mt-5 ml-4">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                      </span>
                    ) : (
                      ""
                    )}
                  </li>
                </Link>
                {/* <!-- Sign In / Register      --> */}
                {isAuthenticated ? (
                  <Link to={"/account"}>
                    <li className="flex items-center hover:text-gray-200">
                      {user.avatar.url ? (
                        <img
                          className="rounded-full w-6 h-6 mr-2"
                          src={user.avatar.url}
                          alt="Profile"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 hover:text-gray-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </li>
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <li className="hover:text-gray-200">Sign In</li>
                  </Link>
                )}
              </div>
            </div>
            {/* <!-- Responsive navbar --> */}

            <li className="xl:hidden flex mr-6 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </li>
            <li
              className="navbar-burger self-center mr-12 xl:hidden"
              onClick={toggleNavbar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </li>
          </nav>
          <nav className="xl:hidden bg-gray-900 text-white w-full">
            {/* Mobile Menu */}
            {isOpen && (
              <div className="px-5 py-6">
                <ul className="flex flex-col space-y-4">
                  <li>
                    <a
                      className="block text-2xl font-semibold hover:text-gray-200"
                      href="#"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-2xl font-semibold hover:text-gray-200"
                      href="#"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-2xl font-semibold hover:text-gray-200"
                      href="#"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-2xl font-semibold hover:text-gray-200"
                      href="#"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </section>
      </div>

      {isAuthenticated && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}
    </>
  );
}

export default Navbar;
