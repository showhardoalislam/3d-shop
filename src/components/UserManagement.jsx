import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      alert(`User role updated to ${newRole.toUpperCase()} successfully!`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          👥 User Roles Management
        </h3>
        <button 
          onClick={fetchUsers} 
          className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded transition"
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-slate-400 text-center py-4">Loading user database...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 uppercase text-xs text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Name / Email</th>
                <th className="py-3 px-4">Current Role</th>
                <th className="py-3 px-4">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3 px-4 font-medium text-white">
                    {u.name || u.email || "Anonymous"}
                    <span className="block text-xs text-slate-500">{u.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      u.role === 'admin' ? 'bg-purple-900/60 text-purple-300 border border-purple-700' :
                      u.role === 'councilor' ? 'bg-amber-900/60 text-amber-300 border border-amber-700' :
                      'bg-cyan-900/60 text-cyan-300 border border-cyan-700'
                    }`}>
                      {u.role ? u.role.toUpperCase() : 'CUSTOMER'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={u.role || 'customer'}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="customer">Customer</option>
                      <option value="councilor">Councilor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
