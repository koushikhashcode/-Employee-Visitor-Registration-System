import React from 'react';
import { LayoutDashboard, Users, UserPlus, Download } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';
import { DotMatrix, GraphicAccentSquares, HazardStripes } from '../common/BrutalistGraphics.jsx';

export const Sidebar = ({ currentView, onNavigate }) => {
  const { openAddModal, exportCsv, dataSource } = useVisitors();
  const isMongo = dataSource === 'mongodb';

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">F</div>
          <div className="sidebar-brand-col">
            <span className="sidebar-brand-title">FRONT DESK</span>
            <div className="sidebar-brand-sub-row">
              <span className="sidebar-brand-sub">REGISTRY 08</span>
              <GraphicAccentSquares />
            </div>
          </div>
        </div>

        <div className="sidebar-nav-section">
          <div className="sidebar-nav-label">NAVIGATION</div>
          
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`sidebar-nav-btn ${currentView === 'dashboard' ? 'active' : 'inactive'}`}
          >
            <div className="sidebar-icon-box">
              <LayoutDashboard size={16} strokeWidth={2.5} />
            </div>
            <span>DASHBOARD</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('visitors')}
            className={`sidebar-nav-btn ${currentView === 'visitors' ? 'active' : 'inactive'}`}
          >
            <div className="sidebar-icon-box">
              <Users size={16} strokeWidth={2.5} />
            </div>
            <span>VISITOR LOG</span>
          </button>
        </div>

        <div className="sidebar-actions-section">
          <div className="sidebar-nav-label">ACTIONS</div>

          <button
            type="button"
            onClick={openAddModal}
            className="sidebar-action-checkin"
          >
            <span className="sidebar-checkin-label">
              <UserPlus size={16} strokeWidth={2.5} />
              <span>CHECK IN</span>
            </span>
            <span className="sidebar-arrow-box">→</span>
          </button>

          <button
            type="button"
            onClick={exportCsv}
            className="sidebar-action-export"
          >
            <div className="sidebar-export-icon">
              <Download size={14} strokeWidth={2.5} />
            </div>
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      <div>
        <div className="sidebar-footer">
          <div className="sidebar-footer-db-row">
            <span className="sidebar-footer-db-label">
              <span className="sidebar-status-icon-box">DB</span>
              <span>DB ENGINE</span>
            </span>
            <span className={`sidebar-footer-badge ${isMongo ? 'mongo' : 'memory'}`}>
              {isMongo ? 'MONGODB' : 'IN-MEMORY'}
            </span>
          </div>

          <div className="sidebar-footer-security">
            <span className="sidebar-security-label">
              <span className="dot-matrix-dot"></span>
              <span>SECURITY ACTIVE</span>
            </span>
            <DotMatrix rows={2} cols={6} />
          </div>
        </div>
        <HazardStripes />
      </div>
    </aside>
  );
};
