import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Space,
  Typography,
  InputNumber,
  message,
  Popconfirm
} from 'antd';

const { Title, Text } = Typography;

//Метод взвешенных экспертных оценок
function WeightedExperts({ problem, onClick, loading, array }) {
  const [solution, setSolution] = useState([]);
  const [sum, setSum] = useState(1.0);
  const altlen = problem.alternatives.length;

  let values = {
    solution: solution
  };

  useEffect(() => {
    let temp = [];

    if (array.length === altlen) {
      let summary = 0;
      for (let i = 0; i < altlen; i += 1) summary += array[i];
      setSolution(array);
      setSum(1.0 - summary);
    } else {
      for (let i = 0; i < altlen; i += 1) temp[i] = null;
      setSolution(temp);
      setSum(1.0);
    }
  }, []);
  let max = 1;
  function handleChange(value, i) {
    let tempSum;
    tempSum = sum - (value - solution[i]);
    setSum(parseFloat(tempSum.toFixed(3)));
    if (sum < 0.0) {
      message.error('Сумма оценок превышает 1!');
      max = 0;
    }
    let tempSol = solution;
    tempSol[i] = value;
    setSolution(tempSol);
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
          <p style={{ float: 'left' }}>
            {'Задайте оценку от 0 до 1'}
            <br />
            {'Для завершения, сумма всех оценок должна равняться 1'}
          </p>
          <p style={{ float: 'right', color: sum < 0 ? 'red' : 'black' }}>
            {'Текущий остаток: '}
            {sum}
          </p>
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
                    max={max}
                    step={0.1}
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
              {sum === 0 && (
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
              )}
              {sum === 0 && (
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  className="mr-2"
                  disabled={loading}
                  onClick={() => onClick(values, 0)}
                >
                  Сохранить
                </Button>
              )}
              <Popconfirm
                title="Последние изменения не сохранятся. Вы уверены?"
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

export default WeightedExperts;
