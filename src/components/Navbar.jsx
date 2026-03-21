import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          กระดานนักพัฒนา
        </p>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          หน้าหลัก
        </Link>
        <Link to="/search" style={{ color: "white", textDecoration: "none" }}>
          🔍 ค้นหา
        </Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          สมาชิก
        </Link>
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
            background: favorites.length > 0 ? "#e53e3e" : "transparent",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: favorites.length > 0 ? "bold" : "normal",
          }}
        >
          ❤️ {favorites.length > 0 ? `${favorites.length} ถูกใจ` : "ถูกใจ"}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
