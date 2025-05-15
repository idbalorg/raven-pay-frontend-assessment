import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
import styles from "./Navigation.module.scss";
import logo from "/random-task.svg";

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu

  const links = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Markets", to: "/markets" },
    { label: "Wallet", to: "/wallet" },
    { label: "Profile", to: "/profile" },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__logo}>
        <img src={logo} alt="Logo" className={styles["navigation__logo-img"]} />
      </div>

      <div className={styles.navigation__search}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles["navigation__search-input"]}
          placeholder="Search..."
        />
      </div>

      {/* Hamburger Icon from React Icons */}
      <div className={styles.navigation__hamburger} onClick={toggleMenu}>
        <FaBars size={30} />
      </div>

      <ul
        className={`${styles.navigation__links} ${
          isMenuOpen ? styles["navigation__links--active"] : ""
        }`}
      >
        {links.map((link) => (
          <li key={link.to} className={styles.navigation__item}>
            <Link
              to={link.to}
              className={`${styles.navigation__link} ${
                currentPath === link.to
                  ? styles["navigation__link--active"]
                  : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
