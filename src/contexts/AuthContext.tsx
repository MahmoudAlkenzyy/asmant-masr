"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// ── Shape of the login API response ──────────────────────────────────────────
export interface AuthUser {
  isAuthenticated: boolean;
  isLocked: boolean;
  name: string;
  email: string;
  roles: string[];
  token: string;
  expiresOn: string; // ISO date string
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuth: AuthResponse | null;
  /** Call after a successful login response to persist & set the user. */
  login: (userData: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}

interface AuthResponse {
  email: string;
  hasMarketAccess: boolean;
  isSubscribed: boolean;
  name: string;
  phoneNumber: string;
}

const AUTH_STORAGE_KEY = "cement_auth_user";

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuth: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuth, setIsAuth] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAuth = async (token: string) => {
    const res = await fetch("https://cement.northeurope.cloudapp.azure.com:5000/api/Account/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setIsAuth(data);

    return data;
  };
  console.log({ isAuth });

  // ── On mount: hydrate from localStorage ────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed: AuthUser = JSON.parse(stored);
        // Validate token expiry
        if (parsed.token && new Date(parsed.expiresOn) > new Date()) {
          setUser(parsed);
          getAuth(parsed.token);
        } else {
          // Token expired – clear storage
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: AuthUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, isLoading, isAuth }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
