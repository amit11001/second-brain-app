import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // If there is no token, show the Auth Page
  if (!token) {
    return <AuthPage setToken={setToken} />;
  }

  // If there is a token, show the main Dashboard
  return <Dashboard onLogout={handleLogout} />;
}

export default App;
