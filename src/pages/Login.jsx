
import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); 

  if (user) {
    navigate("/");
    return null;
  }

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);

      //  get token for backend
      const token = await result.user.getIdToken(true);
      console.log("Firebase Token:", token);

      Swal.fire({ icon: "success", title: "Login successful!" });
      navigate("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Login failed", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken(true);
      console.log("Firebase Token:", token);

      Swal.fire({ icon: "success", title: "Google Login successful!" });
      navigate("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Google Login failed", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
        Login to HomeNest
      </h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider">OR</div>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mt-2"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Login with Google"}
      </button>

      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
