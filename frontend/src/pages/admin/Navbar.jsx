import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-green-600">
        HomeCare
      </h1>

      <div className="flex items-center gap-5">

        <Link to="/">
          Home
        </Link>

        <Link to="/become-partner">
          Become Partner
        </Link>

        <Link
          to="/admin/dashboard"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Admin Panel
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;