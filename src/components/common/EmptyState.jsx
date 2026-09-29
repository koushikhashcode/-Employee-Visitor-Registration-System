import React from 'react';
import { ArrowRight, SearchX } from 'lucide-react';
import { FrontDeskIllustration, DotMatrix } from './BrutalistGraphics.jsx';

export const EmptyState = ({ type = 'no-visitors', title, description, actionText, onAction }) => {
  const isSearch = type === 'no-results';

  return (
    <div className="empty-state">
      <DotMatrix rows={4} cols={4} className="empty-state-dot-tl" />
      <DotMatrix rows={4} cols={4} className="empty-state-dot-br" />

      <div className="empty-state-illustration">
        {isSearch ? (
          <div className="empty-state-search-icon">
            <SearchX size={48} strokeWidth={2.5} />
          </div>
        ) : (
          <FrontDeskIllustration size="md" framed={true} />
        )}
      </div>

      <div className="empty-state-tag">
        <span className="empty-state-tag-text">
          {isSearch ? 'SEARCH FILTER ACTIVE' : 'DESK LOG EMPTY'}
        </span>
      </div>

      <h3 className="empty-state-title">
        {title || (isSearch ? 'NO MATCHING RECORDS' : 'NO VISITORS YET')}
      </h3>

      <p className="empty-state-desc">
        {description ||
          (isSearch
            ? 'No visitor records matched your search parameters. Verify the spelling or mobile number.'
            : "The reception register is clear. Register the first guest to begin today's visitor ledger.")}
      </p>

      {onAction && (
        <button type="button" onClick={onAction} className="brutal-btn empty-state-btn">
          <span>{actionText || (isSearch ? 'RESET SEARCH' : 'ADD FIRST VISITOR')}</span>
          <span className="empty-state-btn-arrow">
            <ArrowRight size={16} strokeWidth={3} />
          </span>
        </button>
      )}
    </div>
  );
};
