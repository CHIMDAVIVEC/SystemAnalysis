import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/auth/AuthContext';
import checkAuth from '../../helpers/checkAuth';

//Страница авторизации пользователя
const LoginForm = ({ history }) => {
  const { LoginAction, state, AuthReset } = useContext(AuthContext);
  const { token, loading, error, errResponse } = state;
  const onFinish = (values) => {
    LoginAction(values);
  };
  
  useEffect(() => {
    AuthReset();
  }, []);

  useEffect(() => {
    checkAuth(token);
    if (token) {
      history.push('/home');
      window.location.reload();
    }
  }, [token, history]);

  useEffect(() => {
    if (error) {
      message.error(errResponse);
    }
  }, [error, errResponse]);

  const registration = () => {
    history.push('/user/reg');
  }

  return (
    <div className="test">
      <div className="container ">
        <div>
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-4 align-self-center text-center">
              <h2>Добро пожаловать!</h2>
              <p>Введите свои данные, чтобы продолжить</p>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true
                }}
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Введите e-mail!'
                    }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="E-mail"
                    className="rounded-pill"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Введите пароль!'
                    }
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                    className="rounded-pill"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                  >
                    Войти
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    onClick={registration}
                  >
                    Еще не зарегистрировались?
                  </Button>
                </Form.Item>

              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
