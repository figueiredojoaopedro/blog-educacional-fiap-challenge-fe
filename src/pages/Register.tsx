import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Loader2,
  UserPlus,
  ArrowLeft,
  Mail,
  Lock,
  User as UserIcon,
} from "lucide-react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp({ name, email, password, role });
      alert("Conta criada com sucesso! Faça login para continuar.");
      navigate("/login");
    } catch (error: any) {
      alert(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Voltar para o blog
          </Link>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <UserPlus className="text-blue-600" size={32} />
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Criar Nova Conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 font-medium">
            Junte-se à comunidade FIAP Challenge
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                Nome Completo
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Seu nome completo"
              />
            </div>
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Endereço de e-mail"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Sua senha"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Usuário
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "teacher" | "student")
                }
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm">
                <option value="teacher">Professor</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-blue-300" />
                ) : (
                  <UserPlus className="h-5 w-5 text-blue-300 group-hover:text-blue-100" />
                )}
              </span>
              {loading ? "Criando conta..." : "Cadastrar agora"}
            </button>
          </div>

          <div className="text-center pt-4 border-t border-gray-50">
            <p className="text-sm text-gray-500">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-500">
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
