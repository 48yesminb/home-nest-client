
import { Link } from "react-router";

function ExtraSectionOne() {
  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <img 
          src="https://i.ibb.co.com/qFYTqWPm/modern.jpg"
          alt="Modern Home"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2 text-gray-800 dark:text-gray-200">
          <h2 className="text-3xl font-bold mb-4">Modern Living, Simplified</h2>
          <p className="mb-4">
            Explore our curated collection of stylish, modern homes that combine
            luxury with practicality.
          </p>
          <Link
            to="/all-properties"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ExtraSectionOne;
