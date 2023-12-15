import React, { useState } from "react";
import { BrowserRouter as Router, NavLink, Route, Routes, Navigate } from "react-router-dom";

interface MenuItem {
  label: string;
  section: string;
  className: string;
}

interface MenuProps {
  menu: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ menu }) => {
  const [show, setShow] = useState(false);

  const handleActiveSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.location.hash = e.currentTarget.hash;
    setShow(!show);
  };

  return (
    <header className="l-header" id="header">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/#home" />}
          />
        </Routes>
        <nav className={`nav bd-container ${show ? "show-menu" : ""}`}>
          <span className="nav__logo">Menu</span>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              {menu.map(({ label, section, className }) => (
                <li className="nav__item" key={label}>
                  <NavLink
                    className="nav__link"
                    activeClassName="active-link"
                    onClick={handleActiveSection}
                    to={{ pathname: "/", hash: section }}
                    isActive={(_match: any, location: { hash: string; }) =>
                      location.hash === section
                    }
                  >
                    <i className={`bx ${className} nav__icon`} /> {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={() => setShow(!show)}
          >
            <i className="bx bx-grid-alt" />
          </div>
        </nav>
      </Router>
    </header>
  );
};

export default Menu;
