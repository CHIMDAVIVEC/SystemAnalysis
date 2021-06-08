import React from 'react';
import StatsCard from './StatsCard/StatsCard';
import ProblemStatsStyled from '../../../styles/ProblemStatsStyled';

//Статистика проблем
function ProblemStats({ loading, problems }) {
  const colors = ['#36b9cc', '#f6c23e'];

  return (
    <ProblemStatsStyled>
      {problems.map((item, key) => (
        <StatsCard
          loading={loading}
          stats={item}
          color={colors[key]}
          key={key}
        />
      ))}
    </ProblemStatsStyled>
  );
}

export default ProblemStats;
