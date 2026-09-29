import React, { useState, useMemo } from 'react';
import { Download, UserPlus, X, Filter } from 'lucide-react';
import { useVisitors } from '../context/VisitorContext.jsx';
import { VISITOR_PURPOSE_OPTIONS } from '../types/visitor.js';
import { VisitorTable } from '../components/visitors/VisitorTable.jsx';
import { VisitorCard } from '../components/visitors/VisitorCard.jsx';
import { MobileCardSkeleton } from '../components/common/Skeleton.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { GraphicAccentSquares, DotMatrix } from '../components/common/BrutalistGraphics.jsx';

export const VisitorsPage = () => {
  const {
    visitors,
    loading,
    searchQuery,
    setSearchQuery,
    openAddModal,
    exportCsv,
  } = useVisitors();

  const [selectedPurpose, setSelectedPurpose] = useState('All');

  const filteredVisitors = useMemo(() => {
    const safeVisitors = Array.isArray(visitors) ? visitors : [];
    if (selectedPurpose === 'All') return safeVisitors;
    return safeVisitors.filter((v) => v.purpose === selectedPurpose);
  }, [visitors, selectedPurpose]);

  return (
    <div className="visitors-page">
      {/* Top Banner & Header */}
      <div className="visitors-page-header">
        <div>
          <div className="modal-header-meta">
            <GraphicAccentSquares />
            <span className="modal-header-tag">DATABASE INDEX</span>
          </div>
          <h1 className="visitors-page-title">VISITOR LOG</h1>
          <p className="visitors-page-sub">
            CHRONOLOGICAL ARRIVAL JOURNAL • {Array.isArray(visitors) ? visitors.length : 0} TOTAL ENTRIES
          </p>
        </div>

        {/* Actions */}
        <div className="visitors-page-actions">
          <button type="button" onClick={exportCsv} className="brutal-btn page-btn-export">
            <span>EXPORT CSV</span>
            <span className="page-btn-icon-box">
              <Download size={16} color="#111111" strokeWidth={2.5} />
            </span>
          </button>

          <button type="button" onClick={openAddModal} className="brutal-btn page-btn-checkin">
            <span>CHECK IN</span>
            <span className="page-btn-checkin-icon">
              <UserPlus size={16} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>

      {/* Purpose Filter Strip */}
      <div className="filter-strip">
        <div className="filter-pills">
          <button
            type="button"
            onClick={() => setSelectedPurpose('All')}
            className={`filter-pill ${selectedPurpose === 'All' ? 'active' : 'inactive'}`}
          >
            ALL ENTRIES ({Array.isArray(visitors) ? visitors.length : 0})
          </button>

          {VISITOR_PURPOSE_OPTIONS.map((purpose) => {
            const count = Array.isArray(visitors) ? visitors.filter((v) => v.purpose === purpose).length : 0;
            const isSelected = selectedPurpose === purpose;
            return (
              <button
                key={purpose}
                type="button"
                onClick={() => setSelectedPurpose(purpose)}
                className={`filter-pill ${isSelected ? 'active' : 'inactive'}`}
              >
                {purpose} {count > 0 && <span className="font-mono-numbers">[{count}]</span>}
              </button>
            );
          })}
        </div>

        {(selectedPurpose !== 'All' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedPurpose('All');
              setSearchQuery('');
            }}
            className="filter-reset-btn"
          >
            <X size={14} strokeWidth={3} />
            <span>RESET FILTERS</span>
          </button>
        )}
      </div>

      {/* Query Status Bar */}
      <div className="query-status-bar">
        <div className="query-status-left">
          <Filter size={14} color="#111111" strokeWidth={2.5} />
          <span>
            {searchQuery ? (
              <span>MATCHING QUERY "<span className="query-status-search-term">{searchQuery}</span>": {filteredVisitors.length} RECORDS</span>
            ) : selectedPurpose !== 'All' ? (
              <span>CATEGORY: {selectedPurpose} ({filteredVisitors.length} RECORDS)</span>
            ) : (
              <span>TOTAL REGISTERED: {filteredVisitors.length} VISITORS</span>
            )}
          </span>
        </div>
        <DotMatrix rows={2} cols={5} />
      </div>

      {/* Desktop & Tablet Table */}
      <div className="desktop-only-table">
        <VisitorTable visitors={filteredVisitors} loading={loading} />
      </div>

      {/* Mobile Stacked Cards */}
      <div className="mobile-only-cards">
        {loading ? (
          <>
            <MobileCardSkeleton />
            <MobileCardSkeleton />
            <MobileCardSkeleton />
          </>
        ) : filteredVisitors.length === 0 ? (
          <EmptyState
            type={searchQuery || selectedPurpose !== 'All' ? 'no-results' : 'no-visitors'}
            onAction={
              searchQuery || selectedPurpose !== 'All'
                ? () => {
                    setSelectedPurpose('All');
                    setSearchQuery('');
                  }
                : openAddModal
            }
            actionText={searchQuery || selectedPurpose !== 'All' ? 'RESET SEARCH' : 'ADD FIRST VISITOR'}
          />
        ) : (
          filteredVisitors.map((visitor, index) => (
            <VisitorCard
              key={visitor.id}
              visitor={visitor}
              isNewest={index === 0 && selectedPurpose === 'All' && !searchQuery}
            />
          ))
        )}
      </div>
    </div>
  );
};
