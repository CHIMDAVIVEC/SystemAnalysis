import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { TextArea } = Input;

//Форма редактирования эксперта
function ExpertForm({ user, onFinish, changePasswordModal, loading }) {
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
                  message: 'Введите имя эксперта!'
                }
              ]}
            >
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                cols={50}
                style={{ background: 'white', color: 'black' }}
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
                  message: 'Введите фамилию эксперта!'
                }
              ]}
            >
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                cols={50}
                style={{ background: 'white', color: 'black' }}
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
                  message: 'Введите E-Mail эксперта!'
                }
              ]}
            >
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                cols={50}
                style={{ background: 'white', color: 'black' }}
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
              name="profession"
              label="Профессия"
              rules={[
                {
                  required: true,
                  message: 'Введите профессию эксперта!'
                }
              ]}
            >
              <TextArea autoSize={{ minRows: 1, maxRows: 10 }} cols={50} />
            </Form.Item>
          </Col>
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
                <Link to="/experts">Обратно</Link>
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ExpertForm;
