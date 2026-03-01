import React, { useState } from "react";
import { BookOpen, User, FileText, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("You are not logged in");
      setUser(null);
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "https://note-app-backend-project.onrender.com/user/logout",
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.success) {
        setUser(null);
        localStorage.removeItem("accessToken"); 
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#f8fff9] border-b border-gray-100 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <BookOpen className="text-green-600 w-6 h-6" />
        <span className="text-xl font-bold text-[#1a3321]">NotesApp</span>
      </Link>

      {/* Links & User */}
      <div className="flex items-center gap-8">
        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/features" className="hover:text-green-600 transition">
            Features
          </Link>
          <Link to="/pricing" className="hover:text-green-600 transition">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-green-600 transition">
            About
          </Link>
          <Link to="/register" className="hover:text-green-600 transition">
            Register
          </Link>
        </div>

        {/* User Dropdown / Login */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden focus:ring-2 focus:ring-green-500 transition"
            >
              <img
                src={
                  user.avatar ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  My Account
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                >
                  <User size={18} className="text-gray-400" />
                  Profile
                </Link>

                <Link
                  to="/notes"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                >
                  <FileText size={18} className="text-gray-400" />
                  Notes
                </Link>

                <div className="my-2 border-t border-gray-100"></div>

                <button
                  onClick={async () => {
                    setIsOpen(false);
                    await handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition w-full"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
