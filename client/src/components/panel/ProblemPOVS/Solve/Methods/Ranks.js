import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Typography, InputNumber, Popconfirm } from 'antd';

const { Title, Text } = Typography;

function Ranks({ problem, onClick, loading, array }) {
  const [current, setCurrent] = useState(1);
  const [solution, setSolution] = useState([]);
  const altlen = problem.alternatives.length;

  let values = {
    solution: solution,
    Ra: null,
    Ru: null
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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

  let count = altlen;
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
        <div className="row justify-content-center align-items-center">
          {solution.map(
            (item, i) =>
              current === (group += 1) && (
                <Space direction="vertical" style={{ width: '50%' }}>
                  <Title level={2}>
                    {group}
                    {'/'}
                    {count}
                  </Title>
                  <Space direction="vertical">
                    <Title level={4}>
                      {'Дайте оценку альтернативе от 0 до 10'}
                      <br />
                      {'Больше - предпочтительнее'}
                    </Title>
                    <Text strong>{problem.alternatives[i].formulation}:</Text>
                    <InputNumber
                      key={group}
                      name="solution"
                      defaultValue={solution[i]}
                      min={0}
                      max={10}
                      step={1}
                      onChange={(value) => handleChange(value, i)}
                    />
                  </Space>
                </Space>
              )
          )}
          <Space direction="vertical">
            {current < count && (
              <Button type="primary" onClick={() => next()}>
                Далее
              </Button>
            )}
            {current > 0 && <Button onClick={() => prev()}>Назад</Button>}
          </Space>
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
                onClick={() => onClick(values)}
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
