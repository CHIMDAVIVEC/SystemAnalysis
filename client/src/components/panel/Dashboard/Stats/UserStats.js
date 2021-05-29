import React from 'react';
import StatsCard from './StatsCard/StatsCard';
import UserStatsStyled from '../../../styles/UserStatsStyled';

//Статистика пользователей
function UserStats({ loading, users }) {
  const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'];
  const icons = [
    <i className="fas fa-users"></i>,
    <i className="fas fa-user-check"></i>,
    <i className="fas fa-users-cog"></i>,
    <i className="fas fa-user-times"></i>
  ];
  return (
    <UserStatsStyled>
      {users.map((item, key) => (
        <StatsCard
          loading={loading}
          stats={item}
          color={colors[key]}
          icon={icons[key]}
          key={key}
        />
      ))}
    </UserStatsStyled>
  );
}

export default UserStats;
