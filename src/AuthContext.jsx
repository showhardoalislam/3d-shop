// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  googleProvider 
} from '../firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Firestore থেকে ইউজারের রোল ফেচ করা
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setRole(userDoc.data().role || 'customer');
        } else {
          // যদি ডাটাবেজে না থাকে তবে ডিফল্ট কাস্টোমার হিসেবে তৈরি হবে
          const newRole = 'customer';
          await setDoc(userDocRef, {
            email: currentUser.email,
            name: currentUser.displayName || '',
            role: newRole,
            createdAt: new Date()
          });
          setRole(newRole);
        }
      } else {
        setUser(null);
        setRole("customer");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google Sign In
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;
      const userDocRef = doc(db, 'users', loggedUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: loggedUser.email,
          name: loggedUser.displayName || '',
          role: 'customer',
          createdAt: new Date()
        });
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.message);
    }
  };

  // Email & Password Registration (Sign Up)
  const registerWithEmail = async (email, password, name) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      
      // Firestore এ ইউজার এবং ডিফল্ট 'customer' রোল সেভ করা
      await setDoc(doc(db, 'users', res.user.uid), {
        email: email,
        name: name,
        role: 'customer',
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message);
    }
  };

  // Email & Password Login
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, role, setRole, loginWithGoogle, registerWithEmail, loginWithEmail, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);