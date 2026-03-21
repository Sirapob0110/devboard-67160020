import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p style={{ color: "#718096", fontSize: "1.2rem" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>
      <Link
        to="/"
        style={{
          color: "#1e40af",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
