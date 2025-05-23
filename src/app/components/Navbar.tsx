"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const Navbar = ({ setNavHeight, className }: { setNavHeight?: (height: number) => void; className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (headerRef.current && setNavHeight) {
      setNavHeight(headerRef.current.offsetHeight);
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setNavHeight]);

  const navItems = [
    { label: "Home", link: "/" },
    {
      label: "Learn Quran",
      submenu: [
        { label: "With text course", link: "/learnquran/" },
        { label: "With video course", link: "/learnquranwithvideo/" },
      ],
    },


    

    { label: "Read Quran", link: "/quran" },
   
    { label: "Blog", link: "/blogs" },
    
    {
      label: "Features",
      submenu: [


        { label: "Nashid", link: "/nashid" },
        { label: "Rukaya", link: "/rokayah" },
        { label: "Islamic Q&A", link: "/qa" },
        { label: "Large Online Library", link: "/library" },
      ],
    },

    {
      label: "Resources",
      submenu: [
        { label: "Contact Us", link: "/Contactus" },
        { label: "About Us", link: "/about-us" },

        { label: "privacy", link: "/Privacy-Policy" },
        { label: "Copy Right", link: "/copyright" },
        { label: "Disclaimer", link: "/disclaimer" },

      ],
    },


    //Contactus ,copyright,disclaimer
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full bg-gradient-to-r from-emerald-900 to-emerald-700 text-white shadow-lg transition-transform duration-500 z-50 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"} ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold tracking-wide font-serif text-yellow-300">Muslims Hub</div>

        {/* Nav Menu */}
        <nav
          className={`absolute md:relative top-full left-0 w-full md:w-auto md:flex md:items-center transition-transform duration-300 ease-in-out bg-emerald-900 md:bg-transparent ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 p-6 md:p-0">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center gap-1 py-2 px-4 hover:text-yellow-300 focus:outline-none"
                    >
                      {item.label}
                      <FaChevronDown
                        className={`text-sm transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>
                    <ul
                      className={`overflow-hidden transition-all duration-300 bg-emerald-800 rounded-md shadow-md md:absolute md:min-w-[180px] md:top-full md:left-0 ${openDropdown === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {item.submenu.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={sub.link}
                            className="block px-4 py-2 text-sm hover:bg-emerald-700 text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.link}
                    className="block py-2 px-4 hover:text-yellow-300"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className="flex flex-col md:hidden z-50 relative"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="navLinks"
        >
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
