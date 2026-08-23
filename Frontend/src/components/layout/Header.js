import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/portfolio/logo.png';

const Header = () => {
  const Menu = [
    { name: "HOME", link: "/" },
    { name: "PORTFOLIO", link: "/portfolio" },
    { name: "CAREER", link: "/career" },
    { name: "ABOUT US", link: "/about" },
    { name: "BLOGS", link: "/blog" },
    {
      name: "MEDIA",
      link: "#",
      submenu: [
        { name: "Press Releases", link: "/press-releases" },
        { name: "Events & Highlights", link: "/events-highlights" },
      ],
    },
    {
      name: "INVESTORS",
      link: "#",
      submenu: [
        { name: "Scheme of Arrangement", link: "/scheme-of-arrangement" },
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const handleMenuToggle = () => {
    setOpen(!open);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (menuName) => {
    setActiveDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const handleLinkClick = () => {
    setOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="relative shadow-md w-full top-0 left-0 z-50">
      <div className="md:flex max-w-[1300px] mx-auto items-center justify-between bg-white md:px-10 px-7">
        {/* Logo */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <Link to="/"><img src={logo} alt="Logo" className="w-[180px] h-full" /></Link>
        </div>

        {/* Mobile Menu Icon */}
        <div
          onClick={handleMenuToggle}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* Navigation Menu */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[50] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-15" : "top-[-490px]"
          }`}
        >
          {Menu.map((item) => (
            <li
              key={item.name}
              className="relative md:ml-8 sm:ml-4 md:my-0 my-7 font-semibold group"
            >
              {!item.submenu ? (
                <Link
                  to={item.link}
                  className={`text-gray-800 hover:text-blue-400 duration-500 ${
                    location.pathname === item.link ? 'border-b-2 border-blue-400' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ) : (
                // Dropdown Parent
                <div className="relative">
                  <button
                    onClick={() =>
                      window.innerWidth < 768
                        ? handleDropdownToggle(item.name)
                        : setActiveDropdown(item.name)
                    }
                    onMouseEnter={() =>
                      window.innerWidth >= 768 && setActiveDropdown(item.name)
                    }
                    onMouseLeave={() =>
                      window.innerWidth >= 768 && setActiveDropdown(null)
                    }
                    className={`text-gray-800 hover:text-blue-400 duration-500 flex items-center gap-1 ${
                      activeDropdown === item.name ? 'text-blue-400' : ''
                    }`}
                  >
                    {item.name}
                  </button>

                  {/* Dropdown Menu */}
                  <ul
                    onMouseEnter={() =>
                      window.innerWidth >= 768 && setActiveDropdown(item.name)
                    }
                    onMouseLeave={() =>
                      window.innerWidth >= 768 && setActiveDropdown(null)
                    }
                    className={`absolute bg-white shadow-md rounded-md w-fit z-50 transition-all duration-200 ${
                      activeDropdown === item.name ? 'block' : 'hidden'
                    }`}
                  >
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          to={sub.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                          onClick={handleLinkClick}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}

          {/* Pitch Us Button */}
          <button className="btn bg-white hover:bg-[#0A235C] text-[#0E4669] hover:text-white border border-[#0E4669] rounded-lg md:ml-8 font-semibold px-3 py-1 duration-500 md:static uppercase">
            <Link to="/pitch" onClick={handleLinkClick}>
              Pitch Us
            </Link>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
