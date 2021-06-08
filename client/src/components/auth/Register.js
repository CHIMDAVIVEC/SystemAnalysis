import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RegistrationContext } from '../../context/register/RegistrationContext';
import axios from 'axios';

const { Option } = Select;

//Страница регистрации нового пользователя
const RegForm = ({ history }) => {
  const { RegAction, state } = useContext(RegistrationContext);
  const { loading, error, success, errResponse } = state;

  const Login = async (data) => {
    const res = await axios.post('/api/auth/login', data);
    localStorage.setItem('howard_shores', res.data.access_token);
  };

  const onFinish = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
      role: "analyst"
    };
    await RegAction(values);
    Login(data);
  };

  useEffect(() => {
    if (error) {
      message.error(errResponse);
    } else if (success) {
      message
        .success('Успешная регистрация!', 1)
        .then(() => history.push('/home'))
        .then(() => window.location.reload());
    }
  }, [error, errResponse, success, history]);

  const login = () => {
    history.push('/user/login');
  };

  return (
    <div className="test">
      <div className="container ">
        <div>
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-4 align-self-center text-center">
              <h2>Добро пожаловать!</h2>
              <p>Заполните поля для регистрации</p>
              <Form
                name="normal_reg"
                className="reg-form"
                initialValues={{
                  remember: true
                }}
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Введите имя!'
                    }
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="Имя"
                    className="rounded-pill"
                  />
                </Form.Item>

                <Form.Item
                  name="surname"
                  rules={[
                    {
                      required: true,
                      message: 'Введите фамилию!'
                    }
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="Фамилия"
                    className="rounded-pill"
                  />
                </Form.Item>

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
                    type="email"
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
                    minLength="6"
                    placeholder="Пароль"
                    className="rounded-pill"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="reg-form-button"
                    loading={loading}
                  >
                    Зарегистрироваться
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button onClick={login}>Уже есть аккаунт?</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
