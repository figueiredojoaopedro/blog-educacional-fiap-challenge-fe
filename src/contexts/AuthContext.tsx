import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
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
      const storedUser = localStorage.getItem("@blog:user");
      const storedToken = localStorage.getItem("@blog:token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }

    loadStoredData();
  }, []);

  const signIn = async ({ email, password }: any) => {
    // In a real application, you would call the API here
    // const response = await api.post('/sessions', { email, password });

    // Mocking for setup
    const mockUser: User = {
      id: "1",
      name: "Professor FIAP",
      email,
      role: "teacher",
    };
    const mockToken = "mock-jwt-token";

    localStorage.setItem("@blog:token", mockToken);
    localStorage.setItem("@blog:user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = () => {
    localStorage.removeItem("@blog:token");
    localStorage.removeItem("@blog:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, signOut, loading }}>
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
