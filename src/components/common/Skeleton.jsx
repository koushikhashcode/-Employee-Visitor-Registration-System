import React from 'react';

export const TableRowSkeleton = () => {
  return (
    <tr className="animate-pulse skeleton-table-row">
      <td className="skeleton-cell">
        <div className="skeleton-badge-yellow sk-w-8" />
        <div className="skeleton-text-small" />
      </td>
      <td className="skeleton-cell">
        <div className="skeleton-text sk-w-6" />
      </td>
      <td className="skeleton-cell">
        <div className="skeleton-text sk-w-9" />
      </td>
      <td className="skeleton-cell">
        <div className="skeleton-text sk-w-7" />
      </td>
      <td className="skeleton-cell">
        <div className="skeleton-badge-yellow" />
      </td>
      <td className="skeleton-cell">
        <div className="skeleton-text sk-w-4" />
      </td>
      <td className="skeleton-cell skeleton-cell-right">
        <div className="skeleton-actions" />
      </td>
    </tr>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="brutal-box animate-pulse skeleton-stat-card">
      <div className="skeleton-stat-label" />
      <div className="skeleton-stat-value" />
      <div className="skeleton-stat-subtext" />
    </div>
  );
};

export const MobileCardSkeleton = () => {
  return (
    <div className="brutal-box animate-pulse skeleton-mobile-card">
      <div className="skeleton-mobile-row">
        <div className="skeleton-badge-yellow sk-w-9 sk-mb-0" />
        <div className="skeleton-text sk-h-1-5 sk-w-5" />
      </div>
      <div className="skeleton-text-small sk-w-12" />
      <div className="skeleton-text-small sk-w-10" />
      <div className="skeleton-mobile-row-top">
        <div className="skeleton-text-small sk-w-6" />
        <div className="skeleton-actions sk-h-2 sk-w-5 sk-mb-0" />
      </div>
    </div>
  );
};
