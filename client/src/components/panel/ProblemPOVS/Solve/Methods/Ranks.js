import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Typography, InputNumber, Popconfirm } from 'antd';

const { Title, Text } = Typography;

//Метод ранга
function Ranks({ problem, onClick, loading, array }) {
  const [solution, setSolution] = useState([]);
  const altlen = problem.alternatives.length;

  let values = {
    solution: solution
  };

  useEffect(() => {
    let temp = [];

    if (array.length === altlen) setSolution(array);
    else {
      for (let i = 0; i < altlen; i += 1) temp[i] = null;
      setSolution(temp);
    }
  }, []);

  function handleChange(value, i) {
    let temp = solution;
    temp[i] = Math.floor(value);
    setSolution(temp);
  }

  let group = 0;
  return (
    <>
      <Form
        name="problem_details_form"
        className="login-form"
        layout="vertical"
        size="large"
        style={{ clear: 'both' }}
      >
        <Title level={4}>
          {'Задайте оценку альтернативе от 0 до 10 включительно'}
          <br />
          {'Наиболее предпочтительнее - 10'}
          <br />
          {'Наименее - 0'}
        </Title>
        <div
          className="row justify-content-center align-items-center"
          style={{ height: '58vh', overflow: 'auto', clear: 'both' }}
        >
          {solution.map((item, i) => (
            <Space
              direction="vertical"
              style={{
                width: '100%',
                border: '1px solid rgba(0, 0, 0, 0.25)',
                margin: '3px',
                padding: '11px'
              }}
            >
              <Title level={4}>{(group += 1)}</Title>
              <Space direction="vertical">
                <Text strong>
                  {'Альтернатива: '}
                  {problem.alternatives[i].formulation}
                </Text>
                <Space direction="horizontal">
                  <Text strong>{'Оценка: '}</Text>
                  <InputNumber
                    key={group}
                    name="solution"
                    defaultValue={solution[problem.alternatives[i].id]}
                    min={0}
                    max={10}
                    step={1}
                    onChange={(value) =>
                      handleChange(value, problem.alternatives[i].id)
                    }
                  />
                </Space>
              </Space>
            </Space>
          ))}
        </div>
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
                onClick={() => onClick(values, 1)}
              >
                Отправить
              </Button>
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="mr-2"
                disabled={loading}
                onClick={() => onClick(values, 0)}
              >
                Завершить
              </Button>
              <Popconfirm
                title="Последние решения не сохранятся. Вы уверены?"
                onConfirm={() =>
                  window.location.replace(`/expert/problem/${problem._id}`)
                }
                okText="Да"
                cancelText="Нет"
              >
                <Button type="info" className="login-form-button">
                  Отмена
                </Button>
              </Popconfirm>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Ranks;
