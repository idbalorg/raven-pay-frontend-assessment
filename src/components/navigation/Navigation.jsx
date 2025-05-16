import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import md5 from "blueimp-md5";
import { FaBars } from "react-icons/fa";
import styles from "./Navigation.module.scss";
import logo from "/random-task.svg";

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const gravatarFallback = user?.email
    ? `https://www.gravatar.com/avatar/${md5(
        user.email.trim().toLowerCase()
      )}?d=identicon`
    : null;

  const avatarUrl = user?.avatar_url || gravatarFallback;

  const links = [
    { label: "Dashboard", to: "/app/dashboard" },
    { label: "Markets", to: "/app/markets" },
    { label: "Wallet", to: "/app/wallet" },
    { label: "", to: "/app/profile", hasAvatar: true },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

              {link.hasAvatar && avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className={styles["navigation__avatar"]}
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%", marginLeft: 8 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
