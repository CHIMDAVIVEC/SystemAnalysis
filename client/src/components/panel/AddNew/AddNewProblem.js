import React, { useContext } from 'react';
import { ProblemContext } from '../../../context/problem/problemContext';
import { UserContext } from '../../../context/user/userContext';
import ProblemForm from '../Forms/ProblemForm';
import HOC from '../HOC';

//Добавление новой проблемы
function AddNewProblem(props) {
  const { addProblem } = useContext(ProblemContext);
  const { users, me } = useContext(UserContext).state;
  const experts = Object.values(users).filter((user) => user.role === 'expert');

  const onFinish = (values) => {
    values.analyst = me._id;
    addProblem(values).then(() => setTimeout(function(){ window.location.replace('/problems');}, 1000));
  };

  return (
    <>
      <ProblemForm onFinish={onFinish} experts={experts} />
    </>
  );
}

export default HOC(AddNewProblem);
