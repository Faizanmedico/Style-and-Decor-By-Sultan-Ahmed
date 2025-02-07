'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  HeartIcon, 
  Bars3Icon, 
  XMarkIcon 
} from "@heroicons/react/24/outline";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden sm:block"> {/* Hide TopBar on mobile */}
        <TopBar />
      </div>

      {/* Main Header */}
      <div className="w-full h-[70px] sm:h-[80px] flex justify-center items-center border-b-2">
        <div className="w-full max-w-[1200px] h-full flex justify-between items-center px-4 sm:px-10">
          {/* Left Section: Logo and Search Bar */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Logo */}
            <h1 className="text-2xl sm:text-3xl font-bold">Style & Decor</h1>

            {/* Search Bar (Hidden on mobile) */}
            <div className="hidden sm:block">
              <SearchBar />
            </div>
          </div>

          {/* Navigation Links (Hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-x-6">
            <ul className="flex gap-x-6 items-center text-sm sm:text-base">
              <li><Link href="/" className="hover:text-[#FB2E86]">Home</Link></li>
              <li className="relative">
                <button 
                  className="hover:text-[#FB2E86]" 
                  onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
                >
                  Pages
                </button>
                {isPagesDropdownOpen && (
                  <ul className="absolute top-full mt-2 bg-white shadow-md rounded-md text-sm text-black">
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/cart">Cart</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/checkout">Billing</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/about">About</Link></li>
                  </ul>
                )}
              </li>
              <li><Link href="/blog" className="hover:text-[#FB2E86]">Blog</Link></li>
              <li><Link href="/shoplist" className="hover:text-[#FB2E86]">Shop</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#FB2E86]">Contact</Link></li>
            </ul>
          </div>

          {/* Right Section: Icons (Hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-x-4">
            <Link href="/cart" className="hover:text-[#FB2E86] flex items-center gap-1">
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Cart</span>
            </Link>
            <Link href="/wishlist" className="hover:text-[#FB2E86] flex items-center gap-1">
              <HeartIcon className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle (Hidden on Desktop) */}
          <button 
            className="block sm:hidden"  // Ensures it only shows on mobile
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6 text-black" /> : <Bars3Icon className="w-6 h-6 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden flex flex-col items-center px-4 py-2 border-t">
          <ul className="w-full text-center">
            <li><Link href="/" className="block py-2 hover:text-[#FB2E86]">Home</Link></li>
            <li><Link href="/blog" className="block py-2 hover:text-[#FB2E86]">Blog</Link></li>
            <li><Link href="/shoplist" className="block py-2 hover:text-[#FB2E86]">Shop</Link></li>
            <li><Link href="/contact-us" className="block py-2 hover:text-[#FB2E86]">Contact</Link></li>
          </ul>

          {/* Mobile Search Bar */}
          <SearchBar />

          {/* Mobile Cart and Wishlist */}
          <div className="flex justify-around w-full py-3 border-t">
            <Link href="/cart" className="flex items-center gap-1 text-sm hover:text-[#FB2E86]">
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Cart</span>
            </Link>
            <Link href="/wishlist" className="flex items-center gap-1 text-sm hover:text-[#FB2E86]">
              <HeartIcon className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
