"use client"
import React, { useState } from 'react'
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <a href="/" className="text-2xl font-bold text-gray-800">
        Sandex<span className="primaryColor">lizzy</span>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Shop</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
      </div>

      {/* Search Bar & Icons */}
      <div className="hidden md:flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
        />
        <FaShoppingCart className="text-gray-700 text-xl cursor-pointer hover:text-blue-600" />
        <FaUser className="text-gray-700 text-xl cursor-pointer hover:text-blue-600" />
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden cursor-pointer">
        {menuOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </button>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden flex flex-col bg-white shadow-md p-4">
        <a href="#" className="py-2 text-gray-700 hover:text-blue-600">Home</a>
        <a href="#" className="py-2 text-gray-700 hover:text-blue-600">Shop</a>
        <a href="#" className="py-2 text-gray-700 hover:text-blue-600">About</a>
        <a href="#" className="py-2 text-gray-700 hover:text-blue-600">Contact</a>
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:border-blue-500"
          />
          <FaShoppingCart className="text-gray-700 text-xl cursor-pointer hover:text-blue-600" />
          <FaUser className="text-gray-700 text-xl cursor-pointer hover:text-blue-600" />
        </div>
      </div>
    )}
  </nav>
  )
}

export default Navbar