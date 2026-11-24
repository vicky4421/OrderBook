
function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row">
                <p>© {new Date().getFullYear()} OrderBook. Supplier & Purchase Order Management.</p>
                <p className="text-xs text-slate-400">Track orders from request to delivery</p>
            </div>
        </footer>
    );
}

export default Footer
