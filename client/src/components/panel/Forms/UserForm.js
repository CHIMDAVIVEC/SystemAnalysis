import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { checkRole } from '../../../helpers/checkAuth';

//Форма создания или редактирования пользователя
const role = checkRole();
function UserForm({ user, onFinish, changePasswordModal, loading }) {
  return (
    <>
      <Form
        name="user_details_form"
        className="login-form"
        initialValues={user}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        style={{ clear: 'both' }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Имя"
              rules={[
                {
                  required: true,
                  message: 'Введите имя!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Имя"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="surname"
              label="Фамилия"
              rules={[
                {
                  required: true,
                  message: 'Введите фамилию!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Фамилия"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={user ? <span>Сменить пароль</span> : 'Пароль'}
              rules={
                user
                  ? []
                  : [
                      {
                        required: true,
                        message: 'Введите пароль!'
                      }
                    ]
              }
              name="password"
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
                readOnly={user ? true : false}
                value={user ? 'u' : ''}
                onClick={() => (user ? changePasswordModal() : {})}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="E-Mail"
              rules={[
                {
                  required: true,
                  message: 'Введите E-Mail!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
          </Col>
          {role === 'admin' && (
            <Col span={12}>
              <Form.Item
                label="Роль"
                name="role"
                placeholder="Роль"
                rules={[
                  {
                    required: true,
                    message: 'Выберите роль из списка!'
                  }
                ]}
              >
                <Select>
                  <Select.Option value="analyst">Аналитик</Select.Option>
                  <Select.Option value="expert">Эксперт</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
        <div
          className="row justify-content-center align-items-center"
          style={{ marginTop: '5%' }}
        >
          <div className="align-self-center text-center">
            <Form.Item>
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="mr-2"
                disabled={loading}
              >
                Сохранить
              </Button>
              <Button type="info" className="login-form-button">
                <Link to={role === 'admin' ? '/users' : '/home'}>Обратно</Link>
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}

export default UserForm;
