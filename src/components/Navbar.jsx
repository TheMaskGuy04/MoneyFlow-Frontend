import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../store/authSlice";
import { flush } from "../store/expenseSlice";
import { baseUrl } from "../../backend-url";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.get(`${baseUrl}/user/logout`, {
      withCredentials: true, // Important for sending cookies
    });

    // console.log(res);
    dispatch(logout());
    dispatch(flush());
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">
                  MoneyFlow
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/expenses"
                className="py-4 px-2 text-white hover:text-blue-200 transition duration-300"
              >
                Expenses
              </Link>
              <Link
                to="/profile"
                className="py-4 px-2 text-white hover:text-blue-200 transition duration-300"
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <button
                onClick={() => handleLogout()}
                className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300"
              >
                Login
              </Link>
            )}

            {/* <Link
              to="/register"
              className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
            >
              Register
            </Link> */}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <ul className="">
          <li>
            <Link
              to="/expenses"
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 transition duration-300"
            >
              Expenses
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 transition duration-300"
            >
              Profile
            </Link>
          </li>

          {isAuthenticated ? (
            <li>
              <button
                onClick={() => handleLogout()}
                className="block text-sm px-2 py-4 text-white hover:bg-blue-500 transition duration-300"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300"
              >
                Login
              </Link>
            </li>
          )}
          {/* <li>
            <Link
              to="/login"
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 transition duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 transition duration-300"
            >
              Register
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
