import { Outlet } from "react-router-dom";
import Header from "./header";


function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
            <Header />
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
