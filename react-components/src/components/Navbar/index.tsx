import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="header">
      <nav className="header__navbar navbar">
        <div className="navbar__content container">
          <ul className="navbar__menu-list menu">
            <li className="menu__item">
              <NavLink to="/" className="menu__link">
                Home
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/aboutus" className="menu__link">
                About us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
