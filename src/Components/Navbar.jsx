import React from 'react';
import { Link, useNavigate } from "react-router"; // <- react-router-dom
import { getAuth, signOut } from "firebase/auth";
import ThemeToggle from './ThemeToogle';
import FileUpload from './FileUploader'; // <- use same naming

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then((result) => {
        console.log("Sign-out successful.", result);
      })
      .then(() => navigate("/login"))
      .catch((error) => {
        console.error(`Error from signout: ${error.code}`);
      });
  };

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">

        {/* Logo */}
        <Link to="/home" className="max-sm:hidden">
          <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
        </Link>
        <Link to="/home" className="hidden max-sm:block">
          <img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" className="w-9" />
        </Link>

        {/* Navigation links */}
        <nav id="collapseMenu" className="max-lg:hidden lg:!block">
          <ul className="lg:flex gap-x-4">
            <li><Link to="/home" className="hover:text-blue-700 text-blue-700 font-medium text-[15px]">Home</Link></li>
            <li><Link to="/createrecipe" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">Create Recipe</Link></li>
            <li><Link to="/fileupload" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">File Upload</Link></li>
            <ThemeToggle />
          </ul>
        </nav>

        {/* Logout */}
        <div className="flex space-x-4">
          <button
            onClick={logout}
            className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
