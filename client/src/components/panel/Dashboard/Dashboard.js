import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/user/userContext';
import { ProblemContext } from '../../../context/problem/problemContext';
import { Typography } from 'antd';
import UserStats from './Stats/UserStats';
import ProblemStats from './Stats/ProblemStats';
import HOC from '../HOC';

//Главная страница со статистикой проблем и пользователей
const { Title } = Typography;
const index = '1';
function Dashboard() {
  const { state } = useContext(UserContext);
  const { problems } = useContext(ProblemContext).state;

  const { users, loading } = state;

  const [userObj, setuserObj] = useState();
  const [problemObj, setproblemObj] = useState();

  const getUsersData = () => {
    const totalExperts = users
      ? users.filter((user) => user.role === 'expert').length
      : 0;
    const totalAnalysts = users
      ? users.filter((user) => user.role === 'analyst').length
      : 0;
    const userObj = [
      { name: 'Всего экспертов', stats: totalExperts },
      { name: 'Всего аналитиков', stats: totalAnalysts }
    ];

    return userObj;
  };
  const getProblemsData = () => {
    const totalProblemsOpened = problems
      ? problems.filter((problem) => problem.status === 'Открыта').length
      : 0;
    const totalProblemsSolving = problems
      ? problems.filter((problem) => problem.status === 'Оценивается').length
      : 0;
    const problemObj = [
      { name: 'Проблем открыто', stats: totalProblemsOpened },
      { name: 'Проблем оценивается', stats: totalProblemsSolving }
    ];

    return problemObj;
  };

  useEffect(() => {
    setuserObj(getUsersData());
    setproblemObj(getProblemsData());
  }, [users, problems]);

  return (
    <div className="container">
      <Title style={{ textAlign: 'center' }}>Домашняя страница</Title>
      {userObj ? <UserStats users={userObj} loading={loading} /> : null}
      {problemObj ? (
        <ProblemStats problems={problemObj} loading={loading} />
      ) : null}
    </div>
  );
}

export default HOC(Dashboard, index);
