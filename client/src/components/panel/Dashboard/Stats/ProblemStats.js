import React from 'react';
import StatsCard from './StatsCard/StatsCard';
import ProblemStatsStyled from '../../../styles/ProblemStatsStyled';

function ProblemStats({ loading, problems }) {
  const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'];
  const icons = [
    <i className="fas fa-problems"></i>,
    <i className="fas fa-problem-check"></i>,
    <i className="fas fa-problems-cog"></i>,
    <i className="fas fa-problem-times"></i>
  ];
  return (
    <ProblemStatsStyled>
      {problems.map((item, key) => (
        <StatsCard
          loading={loading}
          stats={item}
          color={colors[key]}
          icon={icons[key]}
          key={key}
        />
      ))}
    </ProblemStatsStyled>
  );
}

export default ProblemStats;
