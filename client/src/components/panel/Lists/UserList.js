import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/user/userContext';
import HOC from '../HOC';
import UserTable from './Tables/UserTable';
import Loader from '../../Loader/Loader';

//Список пользователей для администратора
const index = '2';
function UserList() {
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
      <Link
        to="/add-new-user"
        className="btn btn-primary float-right cursor-pointer mb-2 "
      >
        Добавить пользователя
      </Link>
      {!loading ? <UserTable data={users} /> : <Loader />}
    </div>
  );
}

export default HOC(UserList, index);
