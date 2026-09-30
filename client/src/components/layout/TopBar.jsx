import React from 'react';
import { Search, RotateCw, Download, UserPlus, X } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';

export const TopBar = ({ currentView = 'dashboard' }) => {
  const { searchQuery, setSearchQuery, fetchVisitors, openAddModal, exportCsv } = useVisitors();

  const titleText = currentView === 'dashboard' ? 'RECEPTION OVERVIEW' : 'VISITOR REGISTER';

  return (
    <header className="topbar">
      <div className="topbar-container">
        {/* Mobile Header Brand Row */}
        <div className="topbar-mobile-header">
          <div className="topbar-mobile-logo">
            <div className="topbar-mobile-logo-icon">F</div>
            <span className="topbar-mobile-brand">FRONT DESK</span>
          </div>
          <div className="topbar-actions-mobile">
            <button
              type="button"
              className="topbar-btn-icon"
              onClick={() => fetchVisitors?.(true)}
              aria-label="Refresh data"
              title="Refresh register"
            >
              <RotateCw size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Left Side: Desktop Title + Responsive Search */}
        <div className="topbar-left">
          <h1 className="topbar-view-title hidden-mobile">{titleText}</h1>

          <div className="topbar-search-wrapper">
            <div className="topbar-search-box">
              <span className="topbar-search-icon">
                <Search size={16} strokeWidth={2.5} />
              </span>
              <input
                type="text"
                placeholder="SEARCH NAME, PHONE, OR COMPANY..."
                className="topbar-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search visitors"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="topbar-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X size={15} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Desktop Actions */}
        <div className="topbar-actions hidden-mobile-actions">
          <button
            type="button"
            className="topbar-btn-icon"
            onClick={() => fetchVisitors?.(true)}
            aria-label="Refresh data"
            title="Refresh register"
          >
            <RotateCw size={16} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="topbar-btn-secondary"
            onClick={exportCsv}
          >
            <Download size={14} strokeWidth={2.5} />
            <span>EXPORT CSV</span>
          </button>

          <button
            type="button"
            className="topbar-btn-primary"
            onClick={openAddModal}
          >
            <div className="topbar-btn-inner">
              <UserPlus size={16} strokeWidth={2.5} />
              <span>CHECK IN</span>
            </div>
            <div className="btn-icon-box">→</div>
          </button>
        </div>
      </div>
    </header>
  );
};
