// src/components/Navigation.jsx
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Markets", to: "/markets" },
    { label: "Wallet", to: "/wallet" },
    { label: "Profile", to: "/profile" },
  ];

  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              style={{
                textDecoration: "none",
                color: currentPath === link.to ? "#0d6efd" : "#000",
                fontWeight: currentPath === link.to ? "bold" : "normal",
              }}
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
