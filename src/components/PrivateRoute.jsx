
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> 
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
