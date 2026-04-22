import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  avatar?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load from session storage for "session persistence"
  useEffect(() => {
    const saved = sessionStorage.getItem("skyff_auth");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (name: string, email: string) => {
    const newUser = {
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setUser(newUser);
    sessionStorage.setItem("skyff_auth", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("skyff_auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
