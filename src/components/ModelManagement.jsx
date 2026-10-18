import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export function ModelManagement() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('STL');
  const [price, setPrice] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const fetchModels = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'models'));
      const modelList = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setModels(modelList);
    } catch (err) {
      console.error("Error fetching models:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleAddModel = async (e) => {
    e.preventDefault();
    if (!title || !price) return;
    try {
      await addDoc(collection(db, 'models'), {
        title,
        category,
        price: parseFloat(price),
        fileUrl: fileUrl || 'https://via.placeholder.com/150',
        createdAt: new Date()
      });
      setTitle('');
      setPrice('');
      setFileUrl('');
      fetchModels();
    } catch (err) {
      console.error("Error adding model:", err);
      alert("Failed to add model: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this model?")) {
      try {
        await deleteDoc(doc(db, 'models', id));
        fetchModels();
      } catch (err) {
        console.error("Error deleting model:", err);
      }
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
      <h3 className="text-xl font-bold text-cyan-400">📦 3D Model Catalog Management</h3>

      {/* Add Model Form */}
      <form onSubmit={handleAddModel} className="bg-slate-900 p-4 rounded-lg border border-slate-700 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input 
          type="text" 
          placeholder="Model Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="STL">STL File</option>
          <option value="OBJ">OBJ File</option>
          <option value="FBX">FBX File</option>
        </select>
        <input 
          type="number" 
          placeholder="Price ($)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded py-2 text-sm transition">
          + Add Model
        </button>
      </form>

      {/* Models List */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading models...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {models.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-slate-500">No 3D models added yet.</td>
                </tr>
              ) : (
                models.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-700/50">
                    <td className="p-3 font-medium text-white">{m.title}</td>
                    <td className="p-3"><span className="bg-slate-700 px-2 py-0.5 rounded text-xs">{m.category}</span></td>
                    <td className="p-3 text-cyan-400">${m.price}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => handleDelete(m.id)} className="bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1 rounded text-xs transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}