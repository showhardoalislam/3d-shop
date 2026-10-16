import React from "react";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();

  if (!user) {
    return (
      <div className="p-8 text-center text-red-400">
        অ্যাক্সেস করতে প্রথমে আপনার Google / Phone অ্যাকাউন্ট দিয়ে লগইন করুন!
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        🚫 ৪MD/অনুমতি নেই: কাস্টমাররা অ্যাডমিন বা কাউন্সলর ড্যাশবোর্ড দেখতে পারবেন না।
      </div>
    );
  }

  return children;
};