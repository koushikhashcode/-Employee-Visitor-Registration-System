import React from 'react';
import { Download, UserPlus, ArrowRight, Clock, Building2, User, Phone } from 'lucide-react';
import { useVisitors } from '../context/VisitorContext.jsx';
import { ReceptionHeroIllustration } from '../components/common/ReceptionHeroIllustration.jsx';
import { StatCard } from '../components/common/StatCard.jsx';
import { VisitorTable } from '../components/visitors/VisitorTable.jsx';
import { VisitorCard } from '../components/visitors/VisitorCard.jsx';

export const DashboardPage = ({ onNavigateToVisitors }) => {
  const { visitors, loading, openAddModal, exportCsv } = useVisitors();

  const safeVisitors = Array.isArray(visitors) ? visitors : [];

  const todayCount = safeVisitors.filter((v) => {
    const timestamp = v.visitedAt || v.checkInTime;
    if (!timestamp) return false;
    const d = new Date(timestamp);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }).length;

  const latestVisitor = safeVisitors.length > 0 ? safeVisitors[0].name : '—';
  const recentVisitors = safeVisitors.slice(0, 5);

  return (
    <div className="visitors-page">
      {/* Hero Banner */}
      <div className="hero-card">
        <div className="hero-inner">
          <div className="hero-content">
            <h2 className="hero-title">
              <span className="hero-highlight-box">
                <svg className="hero-highlight-svg" viewBox="0 0 140 70" preserveAspectRatio="none">
                  <path
                    d="M 12 0 L 128 0 A 8.75 8.75 0 0 1 128 17.5 A 8.75 8.75 0 0 1 128 35 A 8.75 8.75 0 0 1 128 52.5 A 8.75 8.75 0 0 1 128 70 L 12 70 A 8.75 8.75 0 0 1 12 52.5 A 8.75 8.75 0 0 1 12 35 A 8.75 8.75 0 0 1 12 17.5 A 8.75 8.75 0 0 1 12 0 Z"
                    fill="var(--yellow)"
                  />
                </svg>
                <span className="hero-highlight-text">TODAY</span>
              </span>
              <span className="hero-title-line">AT THE DESK</span>
            </h2>
            <p className="hero-subtitle">
              REAL-TIME VISITOR LOG, HOST ROUTING, AND ACCESS VERIFICATION.
            </p>

            <div className="hero-cta-row">
              <button type="button" onClick={openAddModal} className="hero-btn-primary">
                <span>CHECK IN NEW VISITOR</span>
                <div className="hero-btn-arrow">→</div>
              </button>

              <button type="button" onClick={exportCsv} className="hero-btn-secondary">
                <Download size={15} strokeWidth={2.5} />
                <span>EXPORT CSV</span>
              </button>
            </div>
          </div>

          <div className="hero-ill-wrap">
            <ReceptionHeroIllustration />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="stats-grid">
        <StatCard
          title="TODAY'S VISITORS"
          value={todayCount}
          subtext="REGISTERED SINCE 00:00 HOURS"
          type="yellow"
          loading={loading}
        />
        <StatCard
          title="TOTAL VISITORS"
          value={safeVisitors.length}
          subtext="CUMULATIVE DATABASE REGISTRY"
          type="white"
          loading={loading}
        />
        <StatCard
          title="LATEST VISITOR"
          value={latestVisitor}
          subtext={latestVisitor === '—' ? 'NO ARRIVALS REGISTERED YET' : 'LOGGED AT THE FRONT DESK'}
          type="black"
          loading={loading}
        />
      </div>

      {/* Recent Activity Section */}
      <section className="section-card">
        <div className="section-header">
          <div className="section-title-row">
            <div className="btn-square-36 cursor-default">#</div>
            <div>
              <h2 className="section-title">RECENT VISITORS</h2>
              <p className="sidebar-brand-sub mt-0-125">LAST 5 ARRIVALS PROCESSED AT THE FRONT DESK</p>
            </div>
          </div>
          {onNavigateToVisitors && (
            <button
              type="button"
              className="view-all-btn"
              onClick={onNavigateToVisitors}
            >
              <span>VIEW FULL LOG ({safeVisitors.length})</span>
              <span>→</span>
            </button>
          )}
        </div>

        <div className="section-body">
          {safeVisitors.length === 0 && !loading ? (
            <div className="recent-empty">
              <p className="recent-empty-title">NO VISITORS RECORDED TODAY</p>
              <p className="recent-empty-sub">USE THE CHECK-IN BUTTON TO LOG ARRIVALS</p>
              <button
                type="button"
                onClick={openAddModal}
                className="brutal-btn recent-empty-btn mx-auto"
              >
                + LOG FIRST GUEST
              </button>
            </div>
          ) : (
            <>
              {/* Desktop & Tablet Table */}
              <div className="desktop-only-table">
                <VisitorTable visitors={recentVisitors} loading={loading} />
              </div>

              {/* Mobile Cards */}
              <div className="mobile-only-cards">
                {recentVisitors.map((visitor, idx) => (
                  <VisitorCard
                    key={visitor.id || idx}
                    visitor={visitor}
                    isNewest={idx === 0}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
