import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://home-nest-server-phi.vercel.app/properties")
      .then((res) => {
        const sorted = res.data.sort((a, b) => b._id.localeCompare(a._id));
        setProperties(sorted.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleViewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
        Featured Real Estate
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div
            key={prop._id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white dark:bg-gray-800 dark:text-gray-200 flex flex-col justify-between h-full"
          >
          
            <img
              src={prop.image}
              alt={prop.title}
              className="w-full h-48 object-cover rounded mb-4"
            />

            
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{prop.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <strong>Category:</strong> {prop.category}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-1">
                {prop.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                 {prop.location}
              </p>
              <p className="text-gray-800 dark:text-gray-100 font-bold mb-2">
                 {prop.price}৳
              </p>
            </div>

  
            <button
              onClick={() => handleViewDetails(prop._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-2"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProperties;
