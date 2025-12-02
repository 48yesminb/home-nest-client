import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { auth } from "../firebase/firebase.config";

function AddProperty() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAddProperty = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error!", "You must be logged in to add a property!", "error");
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken(true);

      const newProperty = { title, description, category, location, price: parseInt(price), image };

      await axios.post("https://home-nest-server-phi.vercel.app/properties", newProperty, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire("Success!", "Property added successfully!", "success");
      navigate("/my-properties");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", err.response?.data?.message || err.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-xl bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">Add Property</h2>
      <form onSubmit={handleAddProperty} className="flex flex-col gap-4">
        <input type="text" placeholder="Property Name" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Property Description" className="textarea textarea-bordered" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <select className="select select-bordered" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Rent">Rent</option>
          <option value="Sale">Sale</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>
        <input type="number" placeholder="Price" className="input input-bordered w-full" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Location" className="input input-bordered w-full" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Image URL" className="input input-bordered w-full" value={image} onChange={(e) => setImage(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-full mt-3">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
