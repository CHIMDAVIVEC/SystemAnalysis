import React, { useContext, useEffect } from 'react';
import { Typography, Popconfirm, Button } from 'antd';
import { ProblemContext } from '../../../context/problem/problemContext';
import { UserContext } from '../../../context/user/userContext';

import SingleProblemStyled from '../../styles/SingleProblemStyled';
import ProblemForm from '../Forms/ProblemForm';
import Loader from '../../Loader/Loader';

import HOC from '../HOC';

//Страница данных о конкретной проблеме
function SingleProblem(props) {
  const { state, fetchSingleProblem, editProblem, deleteProblem } = useContext(
    ProblemContext
  );

  const { users, me } = useContext(UserContext).state;
  const experts = Object.values(users).filter((user) => user.role === 'expert');
  const { loading, problem } = state;

  const id = props.match.params.id;

  useEffect(() => {
    fetchSingleProblem(id);
  }, [fetchSingleProblem, id]);

  const onFinish = (values) => {
    values = {
      ...values,
      _id: problem._id,
      analyst: me._id,
      status: problem.status,
      progress: problem.progress
    };
    editProblem(values);
  };

  const onConfirmDelete = () => {
    deleteProblem(id).then(() => setTimeout(function(){ window.location.replace('/problems');}, 1000));
  };

  return (
    <SingleProblemStyled>
      {problem && problem.status === 'Открыта' ? (
        <>
          <Typography>Редактирование проблемы "{problem.name}"</Typography>
          {problem.status === 'Открыта' && (
            <Popconfirm
              title="Вы уверены?"
              onConfirm={onConfirmDelete}
              okText="Удалить"
              cancelText="Закрыть"
            >
              <Button className="float-right" danger>
                Удалить проблему
              </Button>
            </Popconfirm>
          )}

          <ProblemForm
            problem={problem}
            experts={experts}
            onFinish={onFinish}
            loading={loading}
          />
        </>
      ) : (
        <Loader />
      )}
    </SingleProblemStyled>
  );
}

export default HOC(SingleProblem);
