import useFetch from "../hooks/useFetch";

const colors = [
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
  "#FF9800",
  "#E91E63",
  "#009688",
];

function getColor(id) {
  return colors[id % colors.length];
}

function UserList() {
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>สมาชิก</h2>

      <div style={styles.list}>
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <div
              style={{
                ...styles.avatar,
                background: getColor(user.id),
              }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>

            <div>
              <h4 style={styles.name}>{user.name}</h4>
              <p style={styles.email}>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f9fafb", // เปลี่ยนเป็นขาวเทาอ่อน
    padding: "30px",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
    color: "#111",
  },
  list: {
    maxWidth: "500px",
    margin: "0 auto",
  },
  card: {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "12px",
    padding: "14px 16px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "0.2s",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginRight: "14px",
    fontSize: "14px",
  },
  name: {
    margin: 0,
    fontWeight: "600",
    color: "#111",
  },
  email: {
    margin: 0,
    color: "#666",
    fontSize: "13px",
  },
};

export default UserList;
