import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Icon */}
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
        <Link
          to="/contact"
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
