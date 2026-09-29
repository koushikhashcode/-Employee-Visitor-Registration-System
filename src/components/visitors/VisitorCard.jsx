import React from 'react';
import { Edit2, Trash2, Clock, Phone, Building2, User } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';

const getPurposeTagClass = (purpose) => {
  if (purpose === 'Meeting')   return 'badge-purpose meeting';
  if (purpose === 'Interview') return 'badge-purpose interview';
  return 'badge-purpose other';
};

export const VisitorCard = ({ visitor, isNewest = false }) => {
  const { openEditModal, setDeleteCandidate } = useVisitors();

  const d = new Date(visitor.visitedAt);
  const timeStr = !isNaN(d.getTime())
    ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '--:--';
  const dateStr = !isNaN(d.getTime())
    ? d.toLocaleDateString([], { month: 'short', day: 'numeric' })
    : '---';

  return (
    <div className={`visitor-card ${isNewest ? 'newest' : 'normal'}`}>
      {/* Top Header */}
      <div className="visitor-card-top">
        <div>
          {isNewest && <span className="visitor-card-badge-new">LATEST CHECK-IN</span>}
          <h3 className="visitor-card-name">{visitor.name}</h3>
          <div className="visitor-card-org">
            <Building2 size={14} strokeWidth={2.5} />
            <span className="visitor-card-org-text">{visitor.organization}</span>
          </div>
        </div>
        <span className={`${getPurposeTagClass(visitor.purpose)} visitor-card-purpose`}>
          {visitor.purpose}
        </span>
      </div>

      {/* Middle: Host & Phone */}
      <div className="visitor-card-middle">
        <div className="visitor-card-host">
          <User size={14} strokeWidth={2.5} />
          <span>MEETING: <span className="visitor-card-host-name">{visitor.personToMeet}</span></span>
        </div>
        <div className="visitor-card-phone font-mono-numbers">
          <Phone size={14} strokeWidth={2.5} />
          <span>+91 {visitor.mobile}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="visitor-card-bottom">
        <div className="visitor-card-time font-mono-numbers">
          <Clock size={14} strokeWidth={2.5} />
          <span>{timeStr} · {dateStr}</span>
        </div>
        <div className="visitor-card-actions">
          <button
            type="button"
            onClick={() => openEditModal(visitor)}
            className="btn-square-36"
            aria-label={`Edit ${visitor.name}`}
          >
            <Edit2 size={16} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => setDeleteCandidate(visitor)}
            className="btn-square-36 delete-btn"
            aria-label={`Delete record for ${visitor.name}`}
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
