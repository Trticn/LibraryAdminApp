// Sidebar.js
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ mobile = false, closeMenu = () => {} }) => {
  const links = [
    { label: "Knjige", path: "/books", icon: "📖" },
    { label: "Autori", path: "/authors", icon: "✍️" },
    { label: "Članovi", path: "/members", icon: "👥" },
  ];

  const handleClick = () => {
    if (mobile) {
      closeMenu();
    }
  };

  const renderedLinks = links.map((link) => (
    <motion.div
      key={link.path}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className={mobile ? "w-full flex justify-center" : ""}
    >
      <NavLink
        to={link.path}
        onClick={handleClick}
        className={({ isActive }) =>
          `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-indigo-100 hover:bg-indigo-700"
          } ${mobile ? "w-full max-w-xs justify-center" : "mx-1"}`
        }
      >
        {mobile && <span className="mr-2">{link.icon}</span>}
        {link.label}
      </NavLink>
    </motion.div>
  ));

  return mobile ? (
    <div className="p-2 space-y-2">
      {renderedLinks}
    </div>
  ) : (
    <nav className="flex space-x-2">
      {renderedLinks}
    </nav>
  );
};

export default Sidebar;