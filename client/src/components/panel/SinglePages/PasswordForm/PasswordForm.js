import React from 'react';
import { Modal, Form, Input } from 'antd';

const PasswordForm = ({ visible, onCreate, onCancel, id }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Смена пароля"
      okText="Сменить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            values._id = id;
            onCreate(values);
          })
          .catch((info) => {
            console.log('Валидация не удалась:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public'
        }}
      >
        <Form.Item
          name="newPassword"
          label="Новый пароль"
          rules={[
            {
              required: true,
              min: 6,
              message: "Пароль должен содержать не менее 6 символов!"
            }
          ]}
          hasFeedback
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Подтвердите пароль"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              min: 6,
              message: "Пароль должен содержать не менее 6 символов!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('Пароли не совпадают!');
              }
            })
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordForm;
