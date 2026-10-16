// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();

  if (!user) {
    return (
      <div className="p-8 text-center text-red-400 font-medium">
        অ্যাক্সেস করতে প্রথমে আপনার Google অ্যাকাউন্ট দিয়ে সাইন-ইন করুন।
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        🚫 অ্যাক্সেস ব্লকড: এই পেজটি শুধুমাত্র {allowedRoles.join(" / ")} এর জন্য নির্ধারিত।
      </div>
    );
  }

  return children;
};