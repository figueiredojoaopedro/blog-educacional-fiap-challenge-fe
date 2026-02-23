import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PostProvider } from "./contexts/PostContext";
import Home from "./pages/Home";
import PostView from "./pages/PostView";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PostForm from "./pages/PostForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostView />} />
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/new" element={<PostForm />} />
                  <Route path="/admin/edit/:id" element={<PostForm />} />
                </Route>
              </Routes>
            </main>
            <footer className="bg-white border-t border-gray-100 py-12 mt-auto text-center text-gray-400 font-medium">
              <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-sm"></div>
                  </div>
                  <span className="text-xl font-black text-gray-900 tracking-tight">
                    FIAP{" "}
                    <span className="text-blue-600 font-medium italic">
                      Challenge
                    </span>
                  </span>
                </div>
                <p>
                  © 2026 Blog Educacional FIAP. Todos os direitos reservados.
                </p>
                <div className="flex gap-8 mt-4">
                  <span className="hover:text-blue-600 cursor-pointer transition-colors">
                    Política de Privacidade
                  </span>
                  <span className="hover:text-blue-600 cursor-pointer transition-colors">
                    Termos de Uso
                  </span>
                  <span className="hover:text-blue-600 cursor-pointer transition-colors">
                    Suporte
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
