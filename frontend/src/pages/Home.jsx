import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="fb-page">
      <header className="fb-header fb-home-header">
        <div className="fb-logo">facebook</div>
        <button className="fb-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <main className="fb-home-main">
        <div className="fb-welcome-card">
          <h2>Welcome, {user.firstName} {user.lastName} 👋</h2>
          <p>You're logged in. This is a protected page — it only renders when a valid JWT is stored in localStorage.</p>
          <p className="fb-email-line">Logged in as: <strong>{user.email}</strong></p>
        </div>
      </main>
    </div>
  );
}

export default Home;
