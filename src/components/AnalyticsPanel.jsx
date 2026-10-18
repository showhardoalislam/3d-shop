import React from 'react';

export function AnalyticsPanel() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
      <h3 className="text-xl font-bold text-purple-400">📊 System Analytics Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-semibold">Total Orders</p>
          <p className="text-2xl font-bold text-white mt-1">128</p>
          <span className="text-xs text-emerald-400">↑ 12% this week</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-semibold">Active Printers</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">6 / 8</p>
          <span className="text-xs text-slate-400">75% Capacity</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-semibold">Revenue</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">$3,420</p>
          <span className="text-xs text-emerald-400">↑ 8% vs last month</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-semibold">Pending Approvals</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">5</p>
          <span className="text-xs text-amber-400">Requires Councilor Review</span>
        </div>
      </div>
    </div>
  );
}