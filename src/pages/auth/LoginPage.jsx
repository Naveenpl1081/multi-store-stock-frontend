import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { ROLES } from "../../constants/roles";
import { useAuth } from "../../context/AuthContext";




const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setError("");
    setLoading(true);

    try {
      const user = await login({ email, password });
      if (user.role === ROLES.ADMIN) {
        navigate("/admin");
      } else {
        navigate("/shop");
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div>
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;