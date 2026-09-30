import React from 'react';
import { Clock, CheckCircle2, Phone, Building2, User, Edit2, Trash2 } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';
import { TableRowSkeleton } from '../common/Skeleton.jsx';

const getPurposeTagClass = (purpose) => {
  if (purpose === 'Meeting') return 'badge-purpose meeting';
  if (purpose === 'Interview') return 'badge-purpose interview';
  return 'badge-purpose other';
};

export const VisitorTable = ({ visitors = [], loading }) => {
  const { openEditModal, setDeleteCandidate, openConfirmModal } = useVisitors();

  const handleDelete = (visitor) => {
    if (typeof setDeleteCandidate === 'function') {
      setDeleteCandidate(visitor);
    } else if (typeof openConfirmModal === 'function') {
      openConfirmModal(visitor);
    }
  };

  if (loading) {
    return (
      <div className="table-card">
        <div className="table-scroll">
          <table className="visitor-table">
            <thead>
              <tr>
                <th>VISITOR</th>
                <th>COMPANY / ORG</th>
                <th>PURPOSE</th>
                <th>PERSON TO MEET</th>
                <th>CHECK-IN TIME</th>
                <th>STATUS</th>
                <th className="align-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-scroll">
        <table className="visitor-table">
          <thead>
            <tr>
              <th>VISITOR</th>
              <th>COMPANY / ORG</th>
              <th>PURPOSE</th>
              <th>PERSON TO MEET</th>
              <th>CHECK-IN TIME</th>
              <th>STATUS</th>
              <th className="align-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => {
              const isNewest = index === 0;
              const initials = (visitor.name || 'VI').substring(0, 2).toUpperCase();
              const mobile = visitor.mobile || visitor.phone || '—';
              const org = visitor.organization || visitor.company || 'Direct Guest';
              const host = visitor.personToMeet || visitor.hostName || 'Front Desk';
              const timestamp = visitor.visitedAt || visitor.checkInTime || new Date().toISOString();
              const d = new Date(timestamp);
              const timeStr = !isNaN(d.getTime())
                ? d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : '--:--';
              const dateStr = !isNaN(d.getTime())
                ? d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
                : '---';

              return (
                <tr key={visitor.id || index} className={isNewest ? 'newest' : 'normal'}>
                  {/* Visitor info */}
                  <td>
                    <div className="table-name-inner">
                      <div className="table-avatar">{initials}</div>
                      <div>
                        <div className="table-name-text">{visitor.name}</div>
                        <div className="table-mobile-row">
                          <span className="table-mobile-prefix">
                            <Phone size={10} style={{ display: 'inline', marginRight: '2px' }} />
                            +91 {mobile}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Company / Org */}
                  <td>
                    <span className="table-org-text" title={org}>
                      <Building2 size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--muted)' }} />
                      {org}
                    </span>
                  </td>

                  {/* Purpose */}
                  <td>
                    <span className={getPurposeTagClass(visitor.purpose)}>
                      {visitor.purpose || 'General'}
                    </span>
                  </td>

                  {/* Host / Person to meet */}
                  <td>
                    <div className="table-host-cell" title={host}>
                      <User size={12} color="var(--muted)" />
                      <span className="table-host-text">{host}</span>
                    </div>
                  </td>

                  {/* Timestamp */}
                  <td>
                    <div className="table-time-cell">
                      <div className="table-time-row font-mono-numbers">
                        <Clock size={12} color="var(--ink)" />
                        {timeStr}
                      </div>
                      <div className="table-date-row font-mono-numbers">
                        {dateStr}
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <div className="table-status-pill font-mono-numbers">
                      <CheckCircle2 size={10} />
                      CHECKED IN
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="table-actions-cell">
                    <div className="table-actions-inner">
                      <button
                        type="button"
                        className="btn-square-36"
                        onClick={() => openEditModal(visitor)}
                        title={`Edit ${visitor.name}`}
                        aria-label={`Edit ${visitor.name}`}
                      >
                        <Edit2 size={14} strokeWidth={2.5} />
                      </button>
                      <button
                        type="button"
                        className="btn-square-36 delete-btn"
                        onClick={() => handleDelete(visitor)}
                        title={`Delete ${visitor.name}`}
                        aria-label={`Delete ${visitor.name}`}
                      >
                        <Trash2 size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

