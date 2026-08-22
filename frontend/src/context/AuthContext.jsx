import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login, registerNewFarmer } from "../api/authApi";
import { TOKEN_KEY } from "../services/api";

const AuthContext = createContext(null);

const ROLE_KEY = "kissan_connect_role";
const USER_ID_KEY = "kissan_connect_user_id";

function saveSession(result) {
  localStorage.setItem(TOKEN_KEY, result.access_token);
  localStorage.setItem(ROLE_KEY, result.role);
  localStorage.setItem(USER_ID_KEY, String(result.user_id));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      clearSession();
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function signIn(phone, password) {
    const result = await login(phone, password);
    saveSession(result);

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      clearSession();
      setUser(null);
      throw error;
    }
  }

  async function register(payload) {
    const result = await registerNewFarmer(payload);
    saveSession(result);

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      clearSession();
      setUser(null);
      throw error;
    }
  }

  function signOut() {
    clearSession();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isFarmer: user?.role === "farmer",
      isAdmin: ["district_admin", "state_admin", "super_admin"].includes(
        user?.role
      ),
      signIn,
      register,
      signOut,
      refreshUser,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
