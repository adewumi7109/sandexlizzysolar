"use client"
import React, { useEffect, useRef } from 'react'

function Footer() {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(error => {
        console.log("Autoplay prevented. User interaction may be required.", error);
      });
    }
  }, []);
   
  return (
    <footer className="bggray900 text-white py-8 mt-10">
          <audio ref={audioRef} src="/audio/jingle.mp3" loop autoPlay hidden />
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Brand */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">Sandex<span className="green">lizzy</span></h2>
          <p className="gray400 text-sm">Your one-stop shop for solar equipments.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="gray400 hover:text-blue-400">Home</a>
          <a href="#" className="gray400 hover:text-blue-400">Shop</a>
          <a href="#" className="gray400 hover:text-blue-400">About</a>
          <a href="#" className="gray400 hover:text-blue-400">Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="#" className="gray400 hover:text-blue-400">Facebook</a>
          <a href="#" className="gray400 hover:text-blue-400">Twitter</a>
          <a href="#" className="gray400 hover:text-blue-400">Instagram</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Sandexlizzy. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer