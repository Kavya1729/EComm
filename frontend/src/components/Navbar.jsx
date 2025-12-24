import axios from "axios";
import { ShoppingCart, User, LogOut } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(store => store.user)
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const logoutHandler = async() => {
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/logout`, {}, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })

      if(res.data.success){
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-6">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-pink-600 p-1.5 rounded-lg">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Mittal<span className="text-pink-600">Mart</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 items-center text-sm font-medium text-gray-600">
            <li className="hover:text-pink-600 transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-pink-600 transition-colors">
              <Link to="/products">Products</Link>
            </li>
            {user && (
              <li className="hover:text-pink-600 transition-colors">
                <Link to="/profile" className="flex items-center gap-1">
                  <User size={18} /> {user.firstName}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-5">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-pink-600 transition-colors"
          >
            <ShoppingCart size={24} />
            <span className="bg-pink-600 absolute -top-2 -right-2 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              0
            </span>
          </Link>

          {user ? (
            <button onClick={logoutHandler} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-all">
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
