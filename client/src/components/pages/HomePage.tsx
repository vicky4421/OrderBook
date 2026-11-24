import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-8">
            {/* Hero Section */}
            <section className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <span className="mb-3 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Procurement & Supplier Tracking
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Place and Track Supplier Orders in{" "}
                    <span className="text-indigo-600">One Organized Place</span>
                </h1>
                <p className="mt-3 text-sm text-slate-600 sm:text-base">
                    Replace messy spreadsheets and scattered messages. Create purchase
                    orders, manage suppliers, and monitor delivery status from draft to
                    fulfillment.
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Link
                        to="/register"
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                    >
                        Create Free Account
                    </Link>
                    <Link
                        to="/login"
                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Sign In
                    </Link>
                </div>
            </section>

            {/* 3-Column Feature Cards */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900">
                        Quick Purchase Orders
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                        Create itemized orders for your suppliers with clear quantities,
                        unit pricing, and expected delivery dates.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900">
                        Real-Time Order Status
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                        Know immediately which orders are pending approval, confirmed by the
                        supplier, in transit, or delivered.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900">
                        Supplier Directory & History
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                        Keep supplier contact details and past order records centralized so
                        reordering takes seconds.
                    </p>
                </div>
            </section>
        </div>
    );
}