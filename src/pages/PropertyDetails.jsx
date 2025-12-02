import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";

function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch property & reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const propertyRes = await axios.get(`https://home-nest-server-phi.vercel.app/properties/${id}`);
        const reviewsRes = await axios.get(`https://home-nest-server-phi.vercel.app/ratings/property/${id}`);
        setProperty(propertyRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load property details.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Add review
  const handleAddReview = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must login to add a review.",
      });
      return;
    }
    if (!reviewText.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Review",
        text: "Review text cannot be empty!",
      });
      return;
    }

    try {
      setSubmitting(true);
      const token = await auth.currentUser.getIdToken(true);
      const newReview = {
        propertyId: property._id,
        propertyName: property.title,
        propertyImage: property.image || "https://via.placeholder.com/400x250?text=No+Image",
        location: property.location,
        stars: rating,
        reviewText,
      };

      await axios.post("https://home-nest-server-phi.vercel.app/ratings", newReview, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setReviews([
        {
          ...newReview,
          reviewerName: user.displayName || user.email,
          reviewerEmail: user.email,
          createdAt: new Date().toISOString(),
        },
        ...reviews,
      ]);

      setReviewText("");
      setRating(5);

      
      Swal.fire({
        icon: "success",
        title: "Review Added!",
        text: "Your review has been submitted successfully.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not add review. Please try again.",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading property...</p>;
  if (!property)
    return <p className="text-center mt-10 text-red-500">Property not found!</p>;

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <img
          src={property.image || "https://via.placeholder.com/600x400?text=No+Image"}
          alt={property.title}
          className="w-full h-80 md:h-96 object-cover rounded shadow"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
            <p className="mb-1"> {property.location}</p>
            <p className="font-bold mb-2"> {property.price}</p>
            {property.category && <p className="mb-2">Category: {property.category}</p>}
            {property.description && <p>{property.description}</p>}
          </div>
        </div>
      </div>

      {/* Review */}
      {user && (
        <div className="mb-6 p-4 border rounded shadow bg-white dark:bg-gray-800">
          <h3 className="font-semibold mb-2">Add Your Review</h3>
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
            <label className="font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="border p-1 rounded"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write a short review..."
            className="w-full border p-2 rounded mb-2"
          ></textarea>
          <button
            onClick={handleAddReview}
            disabled={submitting}
            className={`py-2 px-4 rounded text-white ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-4 border rounded shadow bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{rev.reviewerName}</span>
                <span className="text-yellow-500 font-bold">
                  {"★".repeat(rev.stars) + "☆".repeat(5 - rev.stars)}
                </span>
              </div>
              <p className="mb-1">{rev.reviewText}</p>
              <p className="text-gray-400 text-sm">
                {new Date(rev.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;
