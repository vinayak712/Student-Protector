import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default ErrorPage;