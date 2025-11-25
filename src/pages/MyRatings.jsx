import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const placeholderImage = "https://via.placeholder.com/400x300?text=No+Image";

function MyRatings() {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await auth.currentUser.getIdToken(true);
      const res = await axios.get(
        `http://localhost:3000/ratings?email=${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRatings(res.data);
    } catch (err) {
      console.error("Fetch ratings failed:", err);
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [user]);

  const handleDelete = async (ratingId) => {
    if (!user) return;
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this rating!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      const token = await auth.currentUser.getIdToken(true);
      await axios.delete(`http://localhost:3000/ratings/${ratingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted!", "Rating deleted successfully.", "success");
      fetchRatings();
    } catch (err) {
      console.error("Delete rating failed:", err);
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Please login to view your ratings.
      </p>
    );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Loading your ratings...
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">My Ratings</h2>

      {ratings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          You haven't rated any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ratings.map((rating) => (
            <div
              key={rating._id}
              className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 flex flex-col"
            >
              <img
                src={rating.propertyImage || placeholderImage}
                alt={rating.propertyName}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{rating.propertyName}</h3>
                {rating.location && (
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Location: {rating.location}
                  </p>
                )}
                <p className="text-gray-600 font-bold mb-1">
                  Rated by: {rating.reviewerName || rating.reviewerEmail}
                </p>
                <p className="text-yellow-500 font-semibold">
                  {"★".repeat(rating.stars) + "☆".repeat(5 - rating.stars)}
                </p>
                <p className="text-gray-500 dark:text-gray-300 italic mt-2">
                  "{rating.reviewText}"
                </p>
              </div>
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => handleDelete(rating._id)}
                  className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded border border-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRatings;
