import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); 

  //  Password
  const validatePassword = (pwd) => {
    if (!/[A-Z]/.test(pwd)) {
      Swal.fire({ icon: "error", title: "Password must have an uppercase letter" });
      return false;
    }
    if (!/[a-z]/.test(pwd)) {
      Swal.fire({ icon: "error", title: "Password must have a lowercase letter" });
      return false;
    }
    if (pwd.length < 6) {
      Swal.fire({ icon: "error", title: "Password must be at least 6 characters" });
      return false;
    }
    return true;
  };

  // 🔹 Email/Password Sign Up
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) return;

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      
      const token = await userCredential.user.getIdToken(true);
      console.log("Firebase Token:", token);

      Swal.fire({ icon: "success", title: "Registration successful!" });
      navigate("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Registration failed", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      
      const token = await user.getIdToken(true);
      console.log("Firebase Token:", token);

      Swal.fire({ icon: "success", title: "Google Sign Up successful!" });
      navigate("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Google Sign Up failed", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  
  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">Create Account</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignUp}
        className="btn btn-outline w-full mt-2"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign Up with Google"}
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;
