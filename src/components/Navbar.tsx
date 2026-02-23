import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, LayoutDashboard, Home, BookOpen } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-6 transition-transform">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">
                FIAP <span className="text-blue-600 font-medium">Blog</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                <Home size={18} />
                Página Inicial
              </Link>
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-6 py-3 rounded-xl transition-all hover:bg-blue-100 active:scale-95">
                Acesso Restrito
              </Link>
            ) : (
              <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Professor
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {user?.name}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Sair">
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
