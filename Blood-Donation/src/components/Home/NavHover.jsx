import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';


const NavHover = ({ isMenuOpen }) => {
  return (
    <ul
      className={`dropdown-menu bg-white shadow-lg transform  -translate-x-1/5 duration-500 ease-in ${
        isMenuOpen ? 'opacity-100 z-50 visible md:w-[220px] whitespace-nowrap pt-5 rounded-b bg-white' : 'opacity-0 invisible'
      }`}
    >
      <li>
        <NavLink
          to="/registration"
          className="text-base text-gray-700 hover:bg-gray-100 hover:text-[#630935] font-semibold block px-4 py-2"
        >
          Register As Donor
          <FontAwesomeIcon icon={faDroplet} className="ml-2" />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/organization"
          className="text-base text-gray-700 hover:bg-gray-100 hover:text-[#630935] font-semibold block px-4 py-2"
        >
          Register As Organization
          <FontAwesomeIcon icon={faDroplet} className="mx-2" />
        </NavLink>
      </li>
    </ul>
  );
};

export default NavHover;
