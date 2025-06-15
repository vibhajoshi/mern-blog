import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from 'flowbite-react';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const dropdownRef = useRef();
  const { theme } = useSelector((state) => state.theme);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debugging user data
  console.log('Current User:', currentUser);

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Vibha's
        </span>{' '}
        Blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex items-center gap-2 md:order-2 relative">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick= {() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun/> : <FaMoon/>}
        </Button>

        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img
                src={
                  currentUser?.profilePicture?.trim()
                    ? currentUser.profilePicture
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        currentUser?.username || 'User'
                      )}&background=random&bold=true`
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    currentUser?.username || 'User'
                  )}&background=random&bold=true`;
                }}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover bg-gray-100"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50 text-gray-900 dark:text-gray-100">

                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-semibold">@{currentUser.username}</p>
                  <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
                </div>
                <Link
                  to="/dashboard?tab=profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <hr />
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => {
                    // Add sign out logic here
                    setDropdownOpen(false);
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/sign-in">
            <Button
              gradientDuoTone="purpleToBlue"
              outline
              className="text-black dark:text-white border-purple-500"
            >
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === '/'}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about" active={path === '/about'}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/projects" active={path === '/projects'}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
