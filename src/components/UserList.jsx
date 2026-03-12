import useFetch from "../hooks/useFetch";

function UserList() {
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;

  return (
    <div>
      <h2>สมาชิก</h2>

      {users.map((user) => (
        <div key={user.id}>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
