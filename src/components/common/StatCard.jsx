import React from 'react';
import { StatCardSkeleton } from './Skeleton.jsx';

export const StatCard = ({ title, value, subtext, type = 'yellow', loading }) => {
  if (loading) return <StatCardSkeleton />;

  const cardClass = type === 'black' ? 'stat-card black' : type === 'white' ? 'stat-card white' : 'stat-card yellow';
  const headerClass = type === 'black' ? 'stat-card-header yellow' : 'stat-card-header ink';
  const subtextClass = type === 'black' ? 'stat-subtext light' : type === 'white' ? 'stat-subtext muted' : 'stat-subtext ink';

  return (
    <div className={cardClass}>
      <div className={headerClass}>
        <span>{title}</span>
        <span className="stat-card-dot" />
      </div>
      <div className="stat-value">{value}</div>
      <div className={subtextClass}>{subtext}</div>
    </div>
  );
};
