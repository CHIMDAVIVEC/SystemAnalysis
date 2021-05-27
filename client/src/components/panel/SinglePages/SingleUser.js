import React, { useContext, useState, useEffect } from 'react';
import { Typography, Popconfirm, Button } from 'antd';
import { UserContext } from '../../../context/user/userContext';
import { checkRole } from '../../../helpers/checkAuth';

import SingleUserStyled from '../../styles/SingleUserStyled';
import PasswordForm from './PasswordForm/PasswordForm';
import UserForm from '../Forms/UserForm';
import Loader from '../../Loader/Loader';

import HOC from '../HOC';

const index = '4';
function SingleExpert(props) {
  const {
    state,
    fetchSingleUser,
    editUserAction,
    deleteUserAction,
    changeUserPasswordAction
  } = useContext(UserContext);
  const [passwordFormVisibility, setpasswordFormVisibility] = useState(false);

  const { loading, user } = state;

  const handlePasswordChange = (data) => {
    changeUserPasswordAction(data);
    setpasswordFormVisibility(false);
  };

  const changePasswordModal = () => {
    setpasswordFormVisibility(!passwordFormVisibility);
  };
  const id = props.match.params.id;

  useEffect(() => {
    fetchSingleUser(id);
  }, [fetchSingleUser, id]);

  const onFinish = (values) => {
    values._id = user._id;
    delete values.password;
    editUserAction(values);
  };

  const onConfirmDelete = () => {
    deleteUserAction(id).then(() =>
      setTimeout(function () {
        window.location.replace('/users');
      }, 1000)
    );
  };

  return (
    <SingleUserStyled>
      {user ? (
        <>
          <Typography>
            Редактирование пользователя {user.name} {user.surname}
          </Typography>
          {checkRole() === 'admin' && (
            <Popconfirm
              title="Вы уверены?"
              onConfirm={onConfirmDelete}
              okText="Удалить"
              cancelText="Закрыть"
            >
              <Button className="float-right" danger>
                Удалить профиль
              </Button>
            </Popconfirm>
          )}

          <UserForm
            user={user}
            onFinish={onFinish}
            changePasswordModal={changePasswordModal}
            loading={loading}
          />
        </>
      ) : (
        <Loader />
      )}
      <PasswordForm
        visible={passwordFormVisibility}
        onCreate={handlePasswordChange}
        loading={loading}
        onCancel={() => {
          setpasswordFormVisibility(false);
        }}
        id={id}
      />
    </SingleUserStyled>
  );
}

export default HOC(SingleExpert, index);
