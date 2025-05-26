"use client";

import { useState, useEffect, createContext, useContext } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: "user-123",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1 (555) 123-4567",
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }
      
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (email === "demo@example.com" && password === "password") {
          const userData = { ...mockUser, email };
          setUser(userData);
          if (typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(userData));
          }
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          createdAt: new Date().toISOString(),
        };
        
        setUser(newUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(newUser));
        }
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  const logout = (): void => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  const authValue: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}