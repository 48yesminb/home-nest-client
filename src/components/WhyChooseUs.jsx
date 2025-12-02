function WhyChooseUs() {
  return (
    <section className="py-12 bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">Why Choose Us</h2>
        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-10">
          We provide trusted, verified properties at the best prices. Our mission
          is to make your home-buying experience safe, smooth, and stress-free.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Verified Listings</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every property on our site is verified for authenticity.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Trusted Agents</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our experienced agents help you make the right decision.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
