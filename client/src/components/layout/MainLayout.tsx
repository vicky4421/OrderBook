import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
            <Header />
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout
