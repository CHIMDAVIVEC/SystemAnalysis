import React from 'react';
import { Card as AntCard } from 'antd';
import StatsCardStyled from '../../../../styles/StatsCardStyled';

//Описание карточки со статистикой
function StatsCard({ loading, stats, color }) {
  return (
    <StatsCardStyled color={color}>
      <AntCard className="card-col" loading={loading}>
        <div className="col">
          <p className="card-text">{stats.name}</p>
          <h5 className="card-stats">{stats.stats}</h5>
        </div>
      </AntCard>
    </StatsCardStyled>
  );
}

export default StatsCard;
