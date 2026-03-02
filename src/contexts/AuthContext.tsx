import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import type { User } from "../types";
import api from "../services/api";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
    role: "teacher" | "student";
  }) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      const storedUser = Cookies.get("@blog:user");
      const storedToken = Cookies.get("@blog:token");

      if (storedUser && storedToken) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse user data from cookies:", error);
          Cookies.remove("@blog:user");
          Cookies.remove("@blog:token");
        }
      }
      setLoading(false);
    }

    loadStoredData();
  }, []);

  const signIn = async ({ email, password }: any) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { access_token, user: userData } = response.data;
      // Secure cookie: httpOnly can't be set from JS, but we can set SameSite and Secure
      Cookies.set("@blog:token", access_token, {
        expires: 7,
        sameSite: "strict",
      });
      Cookies.set("@blog:user", JSON.stringify(userData), {
        expires: 7,
        sameSite: "strict",
      });

      setUser(userData);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error(
        error.response?.data?.message ||
          "Erro ao fazer login. Verifique suas credenciais.",
      );
    }
  };

  const signUp = async (data: any) => {
    try {
      await api.post("/auth/register", data);
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw new Error(
        error.response?.data?.message ||
          "Erro ao criar conta. Tente novamente.",
      );
    }
  };

  const signOut = () => {
    Cookies.remove("@blog:token");
    Cookies.remove("@blog:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
