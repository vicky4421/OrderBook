import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          Order<span className="text-indigo-600">Book</span>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header