import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">HomeNest</h2>
          <p className="text-sm mt-1">Find your dream property easily</p>
        </div>

        
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
          <a href="/all-properties" className="hover:text-yellow-300 transition">All Properties</a>
          <a href="/add-property" className="hover:text-yellow-300 transition">Add Property</a>
        </div>

        
        
      </div>
    </footer>
  );
}

export default Footer;
