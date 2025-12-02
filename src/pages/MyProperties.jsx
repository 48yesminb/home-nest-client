import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch 
  const fetchProperties = async () => {
    try {
      if (!auth.currentUser) return;

      const token = await auth.currentUser.getIdToken(true);
      const email = auth.currentUser.email;

      const res = await axios.get(`https://home-nest-server-phi.vercel.app/properties?email=${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProperties(res.data);
    } catch (err) {
      console.error("Fetch properties failed:", err);
      Swal.fire("Error!", err.response?.data?.message || err.message, "error");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  //  delete property 
  const handleDelete = async (propertyId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await auth.currentUser.getIdToken(true);

        await axios.delete(`https://home-nest-server-phi.vercel.app/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("Deleted!", "Property deleted successfully.", "success");
        fetchProperties(); 
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error!", err.response?.data?.message || err.message, "error");
      }
    }
  };

  // edit property
  const handleEdit = (propertyId) => {
    navigate(`/update-property/${propertyId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">My Properties</h2>

      {properties.length === 0 ? (
        <p className="text-center dark:text-gray-300">No properties added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="p-4 border rounded shadow bg-white dark:bg-gray-800 dark:text-gray-200"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{property.description}</p>
              <p className="mt-2 font-medium">
                Price:  {Number(property.price).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Location:  {property.location}
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEdit(property._id)}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-sm btn-error"
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

export default MyProperties;
