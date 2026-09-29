import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';
import { VisitorForm } from './VisitorForm.jsx';
import { DotMatrix, GraphicAccentSquares } from '../common/BrutalistGraphics.jsx';

export const VisitorModal = () => {
  const { modalState, closeModal } = useVisitors();
  const { isOpen, mode, visitor } = modalState;

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isOpen) closeModal(); };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const isEditing = mode === 'edit';

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="visitor-modal-title" className="modal-backdrop">
      <div className="modal-content-card">
        {/* Header */}
        <div className="modal-header">
          <DotMatrix rows={3} cols={6} className="modal-header-dot-matrix" />
          <div>
            <div className="modal-header-meta">
              <GraphicAccentSquares />
              <span className="modal-header-tag">
                {isEditing ? 'REVISION WORKFLOW' : 'GUEST INTAKE'}
              </span>
            </div>
            <h2 id="visitor-modal-title" className="modal-title">
              <span className="modal-title-badge">{isEditing ? 'EDIT' : 'NEW'}</span>
              <span>VISITOR</span>
            </h2>
            <p className="modal-subtitle">Fill in the details to log this visit.</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close dialog"
            className="modal-close-btn"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <VisitorForm initialVisitor={visitor} onCancel={closeModal} onSuccess={closeModal} />
        </div>
      </div>
    </div>
  );
};
