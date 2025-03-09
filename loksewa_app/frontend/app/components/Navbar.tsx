"use client";
import { useState, useEffect } from 'react';
import { FaUser, FaChartLine, FaClipboardList, FaBook, FaGraduationCap, FaFileAlt, FaPenFancy, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const [theme, setTheme] = useState('light');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'sepia';
      return 'light';
    });
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <FaMoon />;
    return <FaSun />;
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu} />
      )}

      {/* Main Navbar */}
      <nav className={`
        fixed transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg
        md:w-auto md:left-0 md:right-0 md:top-0 md:h-16 
        lg:h-screen lg:w-${isExpanded ? '64' : '20'} lg:left-0 lg:top-0
        ${isMobileMenuOpen ? 'left-0' : '-left-full'}
        h-screen w-64 z-50
      `}>
        {/* Navbar Header */}
        <div className="flex items-center justify-between p-4 md:hidden lg:flex">
          <h1 className={`text-xl font-bold text-gray-800 dark:text-white transition-opacity duration-300 
            ${isExpanded ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
            LokSewa App
          </h1>
          <button onClick={toggleNavbar} className="text-gray-800 dark:text-white lg:block hidden">
            {isExpanded ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Toggle Button - Only visible on md screens */}
        <button 
          onClick={toggleMobileMenu}
          className="fixed top-4 right-4 text-gray-800 dark:text-white md:hidden"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <ul className={`
          space-y-2 flex-grow
          md:flex md:space-y-0 md:space-x-4 md:items-center md:px-4
          lg:flex-col lg:space-x-0 lg:space-y-2
        `}>
          {[
            { href: '/profile', icon: <FaUser />, label: 'Profile' },
            { href: '/progress', icon: <FaChartLine />, label: 'Progress' },
            { href: '/results', icon: <FaClipboardList />, label: 'Results' },
            { href: '/course-materials', icon: <FaBook />, label: 'Course Materials' },
            { href: '/courses', icon: <FaGraduationCap />, label: 'Courses' },
            { href: '/study-materials', icon: <FaFileAlt />, label: 'Study Materials' },
            { href: '/mock-tests', icon: <FaPenFancy />, label: 'Mock Tests' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg 
                  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  md:py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`
                  transition-opacity duration-300
                  md:inline
                  lg:${isExpanded ? 'opacity-100' : 'opacity-0'}
                `}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-3 mt-4 w-full text-gray-700 dark:text-gray-300 
            rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            md:mt-0 md:w-auto
            lg:mt-4 lg:w-full"
        >
          <span className="text-lg">{getThemeIcon()}</span>
          <span className={`transition-opacity duration-300 
            md:inline
            lg:${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            Toggle Theme
          </span>
        </button>
      </nav>
    </>
  );
}
