import React, { useContext, useEffect } from 'react';
import { Typography } from 'antd';
import { UserContext } from '../../../context/user/userContext';
import SingleUserStyled from '../../styles/SingleUserStyled';
import ExpertForm from '../Forms/ExpertForm';
import Loader from '../../Loader/Loader';

import HOC from '../HOC';

//Страница данных о конкретном эксперте
function SingleExpert(props) {
  const { state, fetchSingleUser, editUserAction } = useContext(UserContext);
  const { loading, user } = state;

  const id = props.match.params.id;

  useEffect(() => {
    fetchSingleUser(id);
  }, [fetchSingleUser, id]);

  const onFinish = (values) => {
    var data = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      _id: user._id,
      rating: values.rating,
      profession: values.profession
    };
    editUserAction(data);
  };

  return (
    <SingleUserStyled>
      {user ? (
        <>
          <Typography>
            Просмотр профиля эксперта {user.name} {user.surname}
          </Typography>

          <ExpertForm user={user} onFinish={onFinish} loading={loading} />
        </>
      ) : (
        <Loader />
      )}
    </SingleUserStyled>
  );
}

export default HOC(SingleExpert);
