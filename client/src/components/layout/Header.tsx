import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Brand Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          Order<span className="text-emerald-400">Book</span>
        </Link>

        {/* Navigation Actions*/}
        <nav className="flex items-center gap-4">

          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Get Started
          </Link>

        </nav>

      </div>

    </header>
  )
}

export default Header
