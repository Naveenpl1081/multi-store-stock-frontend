import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";
import { useAuth } from "../../context/AuthContext";


const RegisterPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async ({ username, email, password }) => {
    setError("");
    setLoading(true);

    try {
      await register({ username, email, password });
      navigate("/shop");
    } catch (err) {
      setError(err.response?.data?.error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div>
        <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;