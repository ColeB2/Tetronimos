'use client';
import { useState } from "react";
import NavbarLink from "../NavbarLink/NavbarLink";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }
    return (
        <header className="bg-gray-800 py-4">
            <nav className="container h-4 mx-auto flex justify-between items-center">
                <div className="flex items-center fill-cyan-500 text-red-500">
                    <Link href="/">
                    </Link>
                    <NavbarLink href="/" text="Tetronimos" />
                </div>
                <div className="flex items-center">
                    <nav className="md:flex hidden">
                        <NavbarLink href="/" text="Home" />
                        <NavbarLink href="/about" text="About" />
                        {/* <NavbarLink href="/contact" text="Contact" /> */}
                    </nav>
                <button
                    className="md:hidden text-white"
                    onClick={toggleNav}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6"
                    >
                    <path
                        fillRule="evenodd"
                        d="M3 9h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0-4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 8h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                    />
                    </svg>
                </button>
                </div>
            </nav>
      {/* Collapsible menu */}
        {isNavOpen && (
            <nav className="md:hidden py-2">
                <NavbarLink href="/" text="Home" />
                <NavbarLink href="/about" text="About" />
                {/* <NavbarLink href="/contact" text="Contact" /> */}
            </nav>
        )}
    </header>
    
    );
};

export default Navbar;
