import React, { createContext, useContext, useState, useCallback } from "react";
import { useAppData } from "./AppData";
import { generateLeoId } from "../utils/leoId";

const AuthContext = createContext(null);

const AUTH_KEY = "leo_current_user";

function loadStoredUser() {
  try {
    const s = localStorage.getItem(AUTH_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const { users, setUsers } = useAppData();
  const [user, setUser] = useState(loadStoredUser());

  const persistUser = useCallback((u) => {
    setUser(u);
    if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    else localStorage.removeItem(AUTH_KEY);
  }, []);

  const login = useCallback(
    (role, email, password = null, profile = null) => {
      const students = users.students || [];
      const coordinators = users.coordinators || [];
      const admins = users.admins || [];

      if (role === "student") {
        let found = students.find((s) => s.email.toLowerCase() === email.toLowerCase());
        if (found) {
          persistUser(found);
          return { ok: true };
        }
        if (profile && profile.name && profile.rollNo && profile.phone) {
          const leoId = generateLeoId();
          const newStudent = {
            id: "stu-" + Date.now(),
            email: email.trim(),
            role: "student",
            name: profile.name.trim(),
            rollNo: String(profile.rollNo).trim(),
            phone: String(profile.phone).trim(),
            leoId,
            createdAt: new Date().toISOString(),
          };
          setUsers({ ...users, students: [...students, newStudent] });
          persistUser(newStudent);
          return { ok: true };
        }
        return { ok: false, needsProfile: true };
      }

      if (role === "coordinator") {
        const found = coordinators.find((c) => c.email.toLowerCase() === email.toLowerCase());
        if (!found) return { ok: false, message: "No coordinator found with this email." };
        if (found.password !== password) return { ok: false, message: "Wrong password." };
        if (found.status !== "approved") return { ok: false, message: "Your account is not approved yet." };
        persistUser(found);
        return { ok: true };
      }

      if (role === "admin") {
        const found = admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
        if (!found) return { ok: false, message: "No admin found with this email." };
        if (found.password !== password) return { ok: false, message: "Wrong password." };
        persistUser(found);
        return { ok: true };
      }

      return { ok: false, message: "Invalid role." };
    },
    [users, setUsers, persistUser]
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
