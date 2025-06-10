import { createContext, useContext, useState, useEffect } from "react";
import { LoginApi, SignupApi, getCurrentUser } from "../services/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { success, user } = await getCurrentUser();
        if (success) setUser(user);
      } catch (error) {
        console.error("Session load failed: ", error);
      } finally {
        setLoading(false);
      } 
    }
    loadUser();
  }, []);

  const login = async (credentials) => {
    const { success, user, message } = await LoginApi(credentials);
    if (success) {
      setUser(user);
    };
    return { success, message };
  };

  const signup = async (signUpData) => {
    const { success, user, message } = await SignupApi(signUpData);
    if (success) {
      setUser(user);
    };
    return { success, message };
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
