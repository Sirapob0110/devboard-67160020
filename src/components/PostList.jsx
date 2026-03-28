import { useState } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch";

function PostList() {
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const posts = data.slice(0, 20);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedPosts = [...filtered].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  function toggleSort() {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  }

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* Refresh Button */}
      <button
        onClick={refetch}
        style={{
          marginBottom: "0.75rem",
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "0.45rem 0.9rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "500",
          marginRight: "0.5rem",
        }}
      >
        🔄 Refresh Posts
      </button>

      {/* Sort */}
      <button
        onClick={toggleSort}
        style={{
          marginBottom: "0.75rem",
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.45rem 0.9rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "500",
        }}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ✅ เพิ่มตรงนี้ */}
      <p
        style={{
          textAlign: "center",
          color: "#9ca3af",
          marginBottom: "1rem",
          fontSize: "0.9rem",
        }}
      >
        โพสต์ทั้งหมด: {posts.length} รายการ
      </p>

      {sortedPosts.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {paginatedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ← ก่อนหน้า
        </button>

        <span>
          หน้า {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}

export default PostList;
