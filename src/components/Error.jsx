import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-4xl font-semibold text-gray-700 mt-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
