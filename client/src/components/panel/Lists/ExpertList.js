import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../context/user/userContext';
import HOC from '../HOC';
import ExpertTable from './Tables/ExpertTable';
import Loader from '../../Loader/Loader';

//Список экспертов для аналитика
const index = '2';
function ExpertList() {
  const { users, loading } = useContext(UserContext).state;
  const { fetchUsers } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      await fetchUsers();
    }

    getData();
  }, []);

  return <div>{!loading ? <ExpertTable data={users} /> : <Loader />}</div>;
}

export default HOC(ExpertList, index);
