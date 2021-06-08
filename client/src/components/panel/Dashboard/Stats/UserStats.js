import React from 'react';
import StatsCard from './StatsCard/StatsCard';
import UserStatsStyled from '../../../styles/UserStatsStyled';

//Статистика пользователей
function UserStats({ loading, users }) {
  const colors = ['#4e73df', '#1cc88a'];
  return (
    <UserStatsStyled>
      {users.map((item, key) => (
        <StatsCard
          loading={loading}
          stats={item}
          color={colors[key]}
          key={key}
        />
      ))}
    </UserStatsStyled>
  );
}

export default UserStats;
