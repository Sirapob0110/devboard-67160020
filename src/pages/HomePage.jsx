import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7fafc",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* ซ้าย - main content */}
        <div>
          <AddPostForm onAddPost={() => {}} />
          <PostList />
        </div>

        {/* ขวา - sidebar */}
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "1rem",
            border: "1px solid #e2e8f0",
            position: "sticky",
            top: "1rem",
          }}
        >
          <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
            📌 เกี่ยวกับ
          </h3>
          <p style={{ color: "#718096", fontSize: "0.9rem", margin: 0 }}>
            DevBoard กระดานรวมโพสต์สำหรับนักพัฒนา ค้นหา ถูกใจ
            และติดตามโพสต์ที่สนใจได้เลย
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
