'use client'
import Link from "next/link";
import { CheckCircle, Twitter, Instagram, Linkedin } from "lucide-react"

const Navbar = () => {
  return (
    <header className="text-2xl px-4 lg:px-6 h-14 flex items-center border-b border-gray-800 relative z-10">
        <Link className="flex items-center justify-center" href="#">
          <CheckCircle className="h-6 w-6 mr-2 text-blue-400" />
          <span className="font-bold text-white">TaskMaster</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="#">
            Features
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
          </div>
        </nav>
      </header>
  );
};

export default Navbar;