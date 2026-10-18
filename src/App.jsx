import { UserManagement } from './components/UserManagement';
import { ModelManagement } from './components/ModelManagement';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainApp() {
  const { user, role, loginWithGoogle, registerWithEmail, loginWithEmail, logout } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [adminTab, setAdminTab] = useState(null); // 'models', 'users', 'analytics'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      registerWithEmail(email, password, name);
    } else {
      loginWithEmail(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Navbar & Auth Status */}
      <header className="flex justify-between items-center pb-6 border-b border-slate-700 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">CYBERMESH 3D</h1>
          <p className="text-sm text-slate-400">3D Model & Print Hub</p>
        </div>

        <div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                👤 {user.displayName || user.email} ({role ? role.toUpperCase() : 'USER'})
              </span>
              <button 
                onClick={logout} 
                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-sm transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto">
        {!user ? (
          <div className="max-w-md mx-auto py-12 px-6 bg-slate-800/80 rounded-xl border border-slate-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
              {isRegistering ? 'Create New Account' : 'Sign in to CYBERMESH 3D'}
            </h2>

            {/* Google Sign In Button */}
            <button 
              onClick={loginWithGoogle} 
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-3 transition mb-6 shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.36 7.25 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7s.43 3.58 1.19 5.12l4.09-2.55z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.25 0 3.17 2.64 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="px-3 text-slate-400 text-sm">OR</span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Showhardo Al Islam"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-cyan-600 hover:bg-cyan-700 py-2.5 rounded font-semibold transition"
              >
                {isRegistering ? 'Register Account' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-6">
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-cyan-400 hover:underline"
              >
                {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Customer View */}
            {(!role || role.toLowerCase() === 'customer') && (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
                <h2 className="text-xl font-bold mb-4 text-cyan-400">🛒 Customer Catalog & Customizer</h2>
                <p className="text-slate-300">Browse 3D models, customize options, and place your orders here.</p>
              </div>
            )}

            {/* Councilor View */}
            {role && role.toLowerCase() === 'councilor' && (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
                <h2 className="text-xl font-bold mb-4 text-amber-400">🛠️ Councilor Workbench</h2>
                <p className="text-slate-300">Manage order workflows, review STL files, and update 3D printing statuses.</p>
              </div>
            )}

            {/* Admin View */}
            {role && role.toLowerCase() === 'admin' && (
              <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold mb-2 text-purple-400">👑 Admin Management Panel</h2>
                    <p className="text-slate-300">Manage system configurations, assign councilor roles, and view overall platform metrics.</p>
                  </div>
                  {adminTab && (
                    <button 
                      onClick={() => setAdminTab(null)}
                      className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-xs transition"
                    >
                      🔙 Back to Overview
                    </button>
                  )}
                </div>

                {!adminTab ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                      <h3 className="font-bold text-cyan-400 mb-2">📦 Model Management</h3>
                      <p className="text-sm text-slate-400 mb-4">Add, edit, or remove 3D models from the store catalog.</p>
                      <button 
                        onClick={() => setAdminTab('models')}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded text-sm font-semibold transition"
                      >
                        Manage Models
                      </button>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                      <h3 className="font-bold text-amber-400 mb-2">👥 User Roles Control</h3>
                      <p className="text-sm text-slate-400 mb-4">Manage customer and councilor access permissions.</p>
                      <button 
                        onClick={() => setAdminTab('users')}
                        className="w-full bg-amber-600 hover:bg-amber-700 py-2 rounded text-sm font-semibold transition"
                      >
                        Manage Users
                      </button>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                      <h3 className="font-bold text-purple-400 mb-2">📊 System Analytics</h3>
                      <p className="text-sm text-slate-400 mb-4">View print requests, order statuses, and platform stats.</p>
                      <button 
                        onClick={() => setAdminTab('analytics')}
                        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-sm font-semibold transition"
                      >
                        View Analytics
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {adminTab === 'models' && <ModelManagement />}
                    {adminTab === 'users' && <UserManagement />}
                    {adminTab === 'analytics' && <AnalyticsPanel />}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}