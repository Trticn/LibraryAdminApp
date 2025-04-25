import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";


export default function Root() {

  const location = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-1  mx-auto px-4 sm:px-6 py-8 w-full">
        <Outlet />
      </main>
      <footer className="bg-indigo-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} Biblioteka. Sva prava zadržana.</p>
        </div>
      </footer>
    </div>
  );
}