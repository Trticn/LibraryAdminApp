import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white shadow-lg sticky top-0 z-50 w-screen">
      <div className="container mx-auto px-4 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center text-xl md:text-2xl font-bold hover:text-indigo-200 transition-colors"
              onClick={closeMobileMenu}
            >
              <span className="mr-2 md:mr-3 text-2xl md:text-3xl">📚</span>
              <span className="sm:inline">Biblioteka</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2 text-white hover:text-indigo-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu + Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay klik zona */}
              <motion.div
                key="overlay"
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMobileMenu}
              />

              {/* Sidebar sa TVOJOM animacijom */}
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden relative z-50"
              >
                <Sidebar mobile closeMenu={closeMobileMenu} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
