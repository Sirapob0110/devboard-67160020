import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const results = data.filter((post) =>
    post.title.toLowerCase().includes(q.toLowerCase()),
  );

  function handleSearch(e) {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {});
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ color: "#2d3748" }}>ค้นหาโพสต์</h2>

      <input
        type="text"
        placeholder="ค้นหา..."
        value={q}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1.5rem",
          boxSizing: "border-box",
        }}
      />

      {q && (
        <p style={{ color: "#718096", marginBottom: "1rem" }}>
          พบ {results.length} ผลลัพธ์สำหรับ "{q}"
        </p>
      )}

      {results.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          <Link
            to={`/posts/${post.id}`}
            style={{ color: "#1e40af", textDecoration: "none" }}
          >
            <h3 style={{ margin: "0 0 0.5rem" }}>{post.title}</h3>
          </Link>
          <p style={{ margin: 0, color: "#4a5568" }}>{post.body}</p>
        </div>
      ))}

      {q && results.length === 0 && (
        <p style={{ textAlign: "center", color: "#718096", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}
    </div>
  );
}

export default SearchPage;
