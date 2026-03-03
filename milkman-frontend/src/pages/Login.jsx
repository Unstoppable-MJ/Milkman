import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("customer"); // 🔥 default
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/api/token/", {
        username,
        password,
      });

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Get user role
      const userRes = await API.get("/accounts/me/", {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      const role = userRes.data.role;

      // 🔥 Role validation
      if (role !== loginType) {
        setError(`This account is not a ${loginType}`);
        return;
      }

      localStorage.setItem("role", role);

      // 🔥 Redirect based on role
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/shop");
      }

    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center">
          Milkman Login
        </h1>

        {/* 🔥 Toggle Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setLoginType("customer")}
            className={`px-4 py-2 rounded ${
              loginType === "customer"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Customer
          </button>

          <button
            onClick={() => setLoginType("admin")}
            className={`px-4 py-2 rounded ${
              loginType === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login as {loginType}
          </button>
        </form>

      </div>
    </div>
  );
}