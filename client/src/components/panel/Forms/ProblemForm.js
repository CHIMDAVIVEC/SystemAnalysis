import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import {
  FontColorsOutlined,
  InfoOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import ProblemFormStyled from '../../styles/ProblemFormStyled';

const { TextArea } = Input;
const { Option } = Select;

//Форма создания или редактирования проблемы
function ProblemForm({ problem, experts, onFinish, loading }) {
  const handleChange = (event) => {
    const userId = event.target.value;
    const user = experts.find((u) => u.id === userId);
    this.setState({
      value: user
    });
  };

  return (
    <ProblemFormStyled>
      <Form
        name="problem_details_form"
        className="login-form"
        initialValues={
          problem
            ? {
                ...problem,
                alternatives: problem.alternatives.map(
                  (alternative) => alternative.formulation
                ),
                experts: problem.experts.map((expert) => ({
                  id: expert.id,
                  R: expert.R
                }))
              }
            : {
                name: null,
                formulation: null,
                alternatives: [null, null],
                experts: [null]
              }
        }
        onFinish={onFinish}
        layout="vertical"
        size="large"
        style={{ clear: 'both' }}
      >
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Название"
              rules={[
                {
                  required: true,
                  message: 'Введите название!'
                }
              ]}
            >
              <Input
                style={{
                  background: 'white',
                  color: 'black'
                }}
                prefix={<FontColorsOutlined className="site-form-item-icon" />}
                placeholder="Название"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="formulation"
              label="Формулировка"
              rules={[
                {
                  required: true,
                  message: 'Введите формулировку проблемы!'
                }
              ]}
            >
              <TextArea
                style={{
                  background: 'white',
                  color: 'black'
                }}
                autoSize
                prefix={<InfoOutlined className="site-form-item-icon" />}
                placeholder="Формулировка"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name="scale"
              label="Шкала для метода полного попарного сопоставления"
              rules={[
                {
                  required: true,
                  message: 'Задайте размерность шкалы!'
                }
              ]}
            >
              <InputNumber
                min={1}
                disabled={
                  problem
                    ? problem.status === 'Открыта'
                      ? false
                      : true
                    : false
                }
                style={{
                  background: 'white',
                  color: 'black'
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <label>Альтернативы</label>
            <Form.List name="alternatives">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      {'№' + (index + 1) + ': '}
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Введите альтернативу или удалите поле!'
                          }
                        ]}
                        noStyle
                      >
                        <TextArea
                          disabled={
                            problem
                              ? problem.status === 'Открыта'
                                ? false
                                : true
                              : false
                          }
                          autoSize
                          placeholder={index + 1 + ': Альтернатива'}
                          style={{
                            width: '80%',
                            background: 'white',
                            color: 'black'
                          }}
                        />
                      </Form.Item>
                      {fields.length > 2 &&
                      (!problem || problem.status === 'Открыта') ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  {(!problem || problem.status === 'Открыта') && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Добавить альтернативу
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
          </Col>

          <Col span={12}>
            <label>Эксперты</label>
            <Form.List name="experts">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div
                      key={key}
                      style={{ display: 'flex', width: '100%' }}
                      align="start"
                    >
                      <Form.Item
                        {...restField}
                        validateTrigger={['onChange', 'onBlur']}
                        name={[name, 'id']}
                        fieldKey={[fieldKey, 'id']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Выберите эксперта!'
                          }
                        ]}
                        style={{ width: '100%' }}
                        id="user"
                        onChange={handleChange.bind(this)}
                      >
                        <Select placeholder={key + 1 + ': Эксперт'}>
                          {experts.map((expert, i) => (
                            <Option key={i} value={expert._id}>
                              {expert.name} {expert.surname}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'R']}
                        fieldKey={[fieldKey, 'R']}
                        rules={[
                          {
                            required: true,
                            message: 'Задайте оценку компетентности!'
                          }
                        ]}
                      >
                        <InputNumber min={1} max={12} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(name)}
                        />
                      ) : null}
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Добавить эксперта
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
                {problem ? 'Сохранить' : 'Создать'}
              </Button>
              <Button type="info" className="login-form-button">
                <Link
                  to={problem ? `/analyst/problem/${problem._id}` : '/problems'}
                >
                  Обратно
                </Link>
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </ProblemFormStyled>
  );
}

export default ProblemForm;
