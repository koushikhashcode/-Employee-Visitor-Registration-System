import React from 'react';
import { Search, RotateCw, Download, UserPlus } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';

export const TopBar = () => {
  const { searchQuery, setSearchQuery, fetchVisitors, openAddModal, exportCsv } = useVisitors();

  return (
    <header className="topbar">
      <div className="topbar-container">
        
        <div className="topbar-mobile-header">
          <div className="topbar-mobile-logo">
            <div className="topbar-mobile-logo-icon">F</div>
            <span className="topbar-mobile-brand">FRONT DESK</span>
          </div>
        </div>

        <div className="topbar-left">
          <h1 className="topbar-view-title hidden-mobile">RECEPTION OVERVIEW</h1>
          
          <div className="topbar-search-wrapper">
            <div className="topbar-search-box">
              <input
                type="text"
                placeholder="SEARCH NAME, PHONE, OR COMPANY..."
                className="topbar-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="button" 
                className="topbar-search-clear"
                onClick={() => fetchVisitors(true)}
                aria-label="Search"
              >
                <Search size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="topbar-actions">
          <button 
            type="button" 
            className="topbar-btn-icon" 
            onClick={() => fetchVisitors(true)}
            aria-label="Refresh data"
          >
            <RotateCw size={16} strokeWidth={2.5} />
          </button>
          
          <button 
            type="button" 
            className="topbar-btn-secondary" 
            onClick={exportCsv}
          >
            <Download size={14} strokeWidth={2.5} />
            EXPORT CSV
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
