import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // desc = ใหม่สุดก่อน

  // ดึงโพสต์จาก API
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

        const data = await res.json();
        setPosts(data.slice(0, 20)); // เอา 20 โพสต์แรก
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // filter search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // sort
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

      {/* Sort Button */}
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
        onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
        onMouseOut={(e) => (e.target.style.background = "#1e40af")}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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

      {sortedPosts.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
