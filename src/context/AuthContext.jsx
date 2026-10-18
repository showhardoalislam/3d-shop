// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setRole(userDoc.data().role || "customer");
          } else {
            const newRole = "customer";
            await setDoc(userDocRef, {
              email: currentUser.email,
              name: currentUser.displayName,
              role: newRole,
              createdAt: new Date()
            });
            setRole(newRole);
          }
        } catch (err) {
          console.error("Firestore Role Check Error:", err);
        }
      } else {
        setUser(null);
        setRole("customer");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, role, setRole, loginWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
try {
  const result = await signInWithPopup(auth, googleProvider);
  // User logged in successfully
} catch (error) {
  if (error.code === 'auth/popup-closed-by-user') {
    console.log("ইউজার লগইন পপ-আপ উইন্ডোটি বন্ধ করে দিয়েছেন।");
  } else {
    console.error("লগইন এরর:", error);
  }
}