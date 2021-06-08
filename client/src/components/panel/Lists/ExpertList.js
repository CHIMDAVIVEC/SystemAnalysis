import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/user/userContext';
import { checkRole } from '../../../helpers/checkAuth';
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

  return (
    <div>
      {checkRole() === 'analyst' && (
        <Link
          to="/add-new-expert"
          className="btn btn-primary float-right cursor-pointer mb-2 "
        >
          Добавить эксперта
        </Link>
      )}
      {!loading ? <ExpertTable data={users} /> : <Loader />}
    </div>
  );
}

export default HOC(ExpertList, index);
