import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Hero from '../components/Hero';
import Footer from '../components/Footer'; // Make sure you have this component

const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Banner */}
      <Hero title="Page Not Found" subtitle="Oops! The page you're looking for doesn't exist" />

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center"
        >
          <div className="max-w-2xl text-center">
            {/* Animated 404 Number */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-9xl font-bold text-blue-600 mb-6"
            >
              404
            </motion.div>

            {/* Error Message */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lost in Space?</h2>
            <p className="text-xl text-gray-600 mb-8">
              You've reached the edge of the universe. The page you requested was not found.
            </p>

            {/* Home Button */}
            <motion.a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft className="mr-2" />
              Return to Homepage
            </motion.a>

            {/* Optional Space Illustration */}
            <div className="mt-12">
              <svg
                className="w-64 h-64 mx-auto"
                viewBox="0 0 200 200"
                xmlns=""
              >
                <circle cx="100" cy="100" r="80" fill="#1E40AF" fillOpacity="0.1" />
                <circle cx="40" cy="60" r="5" fill="#F59E0B" />
                <circle cx="150" cy="80" r="3" fill="#FFFFFF" />
                <circle cx="80" cy="150" r="4" fill="#FFFFFF" />
                <path
                  d="M100,30 L120,70 L80,70 Z"
                  fill="#6B7280"
                  transform="rotate(30, 100, 100)"
                />
                <path
                  d="M100,170 L120,130 L80,130 Z"
                  fill="#6B7280"
                  transform="rotate(-15, 100, 100)"
                />
                <circle cx="100" cy="100" r="20" fill="#1E40AF" fillOpacity="0.3" />
              </svg>
            </div>
          </div>
        </motion.main>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFoundPage;