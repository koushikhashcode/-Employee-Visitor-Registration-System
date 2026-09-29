import React from 'react';
import { Clock, CheckCircle2, Phone, Building2, User, UserCheck, X } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';
import { TableRowSkeleton } from '../common/Skeleton.jsx';

export const VisitorTable = ({ visitors, loading }) => {
  const { openConfirmModal } = useVisitors();

  if (loading) {
    return (
      <div className="table-card table-scroll desktop-only-table">
        <table className="visitor-table">
          <thead>
            <tr>
              <th>VISITOR</th>
              <th>COMPANY</th>
              <th>PURPOSE</th>
              <th>HOST</th>
              <th>CHECK IN</th>
              <th>STATUS</th>
              <th className="align-right">ACT</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-card table-scroll desktop-only-table">
      <table className="visitor-table">
        <thead>
          <tr>
            <th>VISITOR</th>
            <th>COMPANY</th>
            <th>PURPOSE</th>
            <th>HOST</th>
            <th>CHECK IN</th>
            <th>STATUS</th>
            <th className="align-right">ACT</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => {
            const isNewest = index === 0;
            const initials = visitor.name.substring(0, 2).toUpperCase();

            return (
              <tr key={visitor.id} className={isNewest ? 'newest' : 'normal'}>
                <td>
                  <div className="table-name-inner">
                    <div className="table-avatar">{initials}</div>
                    <div>
                      <div className="table-name-text">{visitor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.125rem' }}>
                        <span className="table-mobile-prefix">
                          <Phone size={10} style={{ display: 'inline', marginRight: '2px' }} />
                          {visitor.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td>
                  <span className="table-org-text">
                    <Building2 size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--muted)' }} />
                    {visitor.company}
                  </span>
                </td>
                
                <td>
                  <span className={`badge-purpose ${visitor.purpose}`}>
                    {visitor.purpose}
                  </span>
                </td>
                
                <td>
                  <div className="table-host-cell">
                    <User size={12} color="var(--muted)" />
                    <span className="table-host-text">{visitor.hostName}</span>
                  </div>
                </td>
                
                <td>
                  <div className="table-time-cell">
                    <div className="table-time-row">
                      <Clock size={12} color="var(--yellow)" />
                      {new Date(visitor.checkInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="table-date-row">
                      {new Date(visitor.checkInTime).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                    </div>
                  </div>
                </td>
                
                <td>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'var(--yellow)', color: 'var(--ink)', padding: '0.25rem 0.625rem', borderRadius: '1rem', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>
                    <CheckCircle2 size={10} />
                    CHECKED IN
                  </div>
                </td>
                
                <td className="table-actions-cell">
                  <div className="table-actions-inner">
                    <button 
                      type="button" 
                      className="btn-square-36 delete-btn"
                      onClick={() => openConfirmModal(visitor)}
                    >
                      <X size={16} strokeWidth={2.5} />
                    </button>
                    <div className="btn-square-36 cursor-default">→</div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

