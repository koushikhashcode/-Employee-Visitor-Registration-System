import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';
import { GraphicAccentSquares } from './BrutalistGraphics.jsx';

export const ConfirmDialog = () => {
  const { deleteCandidate, setDeleteCandidate, removeVisitor } = useVisitors();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && deleteCandidate) setDeleteCandidate(null);
    };
    if (deleteCandidate) {
      window.addEventListener('keydown', handleKeyDown);
      cancelButtonRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteCandidate, setDeleteCandidate]);

  if (!deleteCandidate) return null;

  const handleConfirm = async () => { await removeVisitor(deleteCandidate.id); };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" className="confirm-backdrop">
      <div className="confirm-card">
        {/* Header */}
        <div className="confirm-header">
          <div className="confirm-header-left">
            <div className="confirm-icon">
              <AlertTriangle size={20} strokeWidth={2.5} />
            </div>
            <div>
              <div className="confirm-header-meta">
                <GraphicAccentSquares />
                <span className="confirm-header-tag">Warning</span>
              </div>
              <h3 id="confirm-dialog-title" className="confirm-title">DELETE THIS ENTRY?</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDeleteCandidate(null)}
            aria-label="Close dialog"
            className="confirm-close-btn"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Target Info */}
        <div className="confirm-target">
          <div className="confirm-target-label">RECORD TARGET</div>
          <div className="confirm-target-name">{deleteCandidate.name}</div>
          <div className="confirm-target-meta">
            <span><strong>ORG:</strong> {deleteCandidate.organization}</span>
            <span><strong>HOST:</strong> {deleteCandidate.personToMeet}</span>
            <span><strong>MOBILE:</strong> +91 {deleteCandidate.mobile}</span>
          </div>
        </div>

        <p className="confirm-warning">* THIS ACTION PERMANENTLY ERASES THE RECEPTION ENTRY.</p>

        {/* Buttons */}
        <div className="confirm-actions">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={() => setDeleteCandidate(null)}
            className="brutal-btn confirm-btn-keep"
          >
            KEEP IT
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="brutal-btn confirm-btn-delete"
          >
            <span>DELETE</span>
            <span className="confirm-delete-arrow">
              <ArrowRight size={16} strokeWidth={3} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
