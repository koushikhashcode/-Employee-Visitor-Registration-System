import React from 'react';
import { LayoutDashboard, Users, UserPlus, Download } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';

export const MobileNav = ({ currentView, onNavigate }) => {
  const { openAddModal, exportCsv } = useVisitors();

  return (
    <nav aria-label="Mobile navigation" className="mobile-nav">
      <button
        type="button"
        onClick={() => onNavigate('dashboard')}
        className={`mobile-nav-item ${currentView === 'dashboard' ? 'active' : 'inactive'}`}
      >
        <LayoutDashboard size={20} strokeWidth={2.5} className="mobile-nav-icon" />
        <span className="mobile-nav-label">DESK</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('visitors')}
        className={`mobile-nav-item ${currentView === 'visitors' ? 'active' : 'inactive'}`}
      >
        <Users size={20} strokeWidth={2.5} className="mobile-nav-icon" />
        <span className="mobile-nav-label">LOG</span>
      </button>

      <button
        type="button"
        onClick={openAddModal}
        className="mobile-nav-item action"
      >
        <UserPlus size={20} strokeWidth={2.5} className="mobile-nav-icon" />
        <span className="mobile-nav-label white">+ CHECK IN</span>
      </button>

      <button
        type="button"
        onClick={exportCsv}
        className="mobile-nav-item export"
        aria-label="Export CSV"
      >
        <Download size={20} strokeWidth={2.5} className="mobile-nav-icon" />
        <span className="mobile-nav-label small">CSV</span>
      </button>
    </nav>
  );
};
