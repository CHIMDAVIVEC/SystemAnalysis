import React, { useContext } from 'react';
import { UserContext } from '../../../context/user/userContext';
import UserForm from '../Forms/UserForm';
import HOC from '../HOC';

//Добавление нового пользователя
function AddNewUser() {
  const { addUser } = useContext(UserContext);

  const onFinish = (values) => {
    addUser(values).then(() =>
      setTimeout(function () {
        window.location.replace('/users');
      }, 1000)
    );
  };

  return (
    <>
      <UserForm onFinish={onFinish} />
    </>
  );
}

export default HOC(AddNewUser);
