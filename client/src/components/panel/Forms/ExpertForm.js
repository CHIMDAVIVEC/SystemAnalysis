import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, Button, InputNumber } from 'antd';

const { TextArea } = Input;

//Форма редактирования эксперта
function ExpertForm({ user, onFinish, loading }) {
  return (
    <>
      <Form
        name="user_details_form"
        className="login-form"
        initialValues={{ ...user, rating: user.rating === 0 ? 1 : user.rating }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        style={{ clear: 'both' }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item name="name" label="Имя">
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                cols={50}
                disabled={true}
                style={{ background: 'white', color: 'black' }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="surname" label="Фамилия">
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                cols={50}
                disabled={true}
                style={{ background: 'white', color: 'black' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item name="email" label="E-Mail">
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                cols={50}
                disabled={true}
                style={{ background: 'white', color: 'black' }}
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
          <Col span={12}>
            <Form.Item
              name="rating"
              label="Оценка"
              rules={[
                {
                  required: true,
                  message: 'Введите оценку в соответствии с таблицей!'
                }
              ]}
            >
              <InputNumber min={1} max={12} />
            </Form.Item>
            <img alt="" src="https://i.imgur.com/wtFcwoX.png" />
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
