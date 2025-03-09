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
        <div className="fixed d-block inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu} />
      )}

      {/* Main Navbar */}
      <nav className={`
        fixed transition-all duration-300 
        bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
        shadow-lg border-b border-gray-200 dark:border-gray-700
        md:w-full md:left-0 md:right-0 md:top-0 md:h-16 
        ${isMobileMenuOpen ? 'left-0' : '-left-full'}
        h-16 w-full z-50
      `}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              LokSewa App
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-1">
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
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200
                    rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                    hover:text-blue-600 dark:hover:text-blue-400
                    transition-all duration-200 ease-in-out"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Section with Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                text-gray-600 dark:text-gray-300 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <span className="text-xl">{getThemeIcon()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg md:hidden text-gray-600 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg
          transition-transform duration-300 ease-in-out
          md:hidden
          ${isMobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}
        `}>
          <ul className="py-2">
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
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200
                    rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                    hover:text-blue-600 dark:hover:text-blue-400
                    transition-all duration-200 ease-in-out"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
