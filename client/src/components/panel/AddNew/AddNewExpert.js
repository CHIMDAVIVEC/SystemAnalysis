import React, { useContext } from 'react';
import { UserContext } from '../../../context/user/userContext';
import ExpertForm from '../Forms/ExpertForm';
import HOC from '../HOC';

//Добавление нового пользователя
function AddNewExpert() {
  const { addUser } = useContext(UserContext);

  const onFinish = (values) => {
    const data = {
      ...values,
      role: "expert"
    }
    addUser(data);
  };

  return (
    <>
      <ExpertForm onFinish={onFinish} />
    </>
  );
}

export default HOC(AddNewExpert);
