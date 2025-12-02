import axios from "axios";
import { useEffect, useState } from "react";

function AllProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("https://home-nest-server-phi.vercel.app/properties")
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">All Properties</h2>
      <div className="grid grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <img src={p.image} alt={p.title} className="w-full h-48 object-cover mb-3" />
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p>{p.location}</p>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProperties;
