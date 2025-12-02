import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { auth } from "../firebase/firebase.config";

function UpdateProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true); // data loading
  const [submitting, setSubmitting] = useState(false); // submit disable

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/properties/${id}`);
        const property = res.data;

        if (property.userEmail !== user.email) {
          Swal.fire("Error!", "You cannot edit this property", "error");
          navigate("/my-properties");
          return;
        }

        setTitle(property.title);
        setDescription(property.description);
        setCategory(property.category);
        setLocation(property.location);
        setPrice(property.price);
        setImage(property.image);
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", err.response?.data?.message || err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = await auth.currentUser.getIdToken(true);

      await axios.patch(
        `http://localhost:3000/properties/${id}`,
        { title, description, category, location, price: parseInt(price), image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success!", "Property updated successfully!", "success");
      navigate("/my-properties");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", err.response?.data?.message || err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading property...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-xl bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">Update Property</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Property Name"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Property Description"
          className="textarea textarea-bordered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Rent">Rent</option>
          <option value="Sale">Sale</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        
        <button
          type="submit"
          className={`btn btn-primary w-full mt-3 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProperty;

