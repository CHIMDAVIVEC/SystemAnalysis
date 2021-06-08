import React, { useState, useEffect } from 'react';
import { Form, Button, Radio, Space, Typography, Popconfirm } from 'antd';

const { Title, Text } = Typography;

//Метод парных сравнений
function PairComparisons({ problem, onClick, loading, array }) {
  const [solution, setSolution] = useState([]);
  const altlen = problem.alternatives.length;

  let values = {
    solution: solution
  };

  useEffect(() => {
    let temp = [];
    if (array.length !== 0) setSolution(array);
    else {
      for (let i = 0; i < altlen; i += 1) {
        temp[i] = [];
        for (let k = 0; k < altlen; k += 1) {
          if (i !== k) temp[i][k] = null;
          else temp[i][k] = 0;
        }
      }
      setSolution(temp);
    }
  }, []);

  function handleChange(value, i, k) {
    let temp = solution;
    temp[i][k] = value;
    temp[k][i] = 1 - value;
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
          {'Из двух альтернатив выберите наиболее предпочтительную:'}
        </Title>
        <div
          className="row justify-content-center align-items-center"
          style={{ height: '60vh', overflow: 'auto' }}
        >
          {solution.map((column, i) =>
            column.map(
              (row, k) =>
                i < k && (
                  <Space
                    direction="vertical"
                    style={{
                      width: '100%',
                      border: '1px solid rgba(0, 0, 0, 0.25)',
                      margin: '3px',
                      padding: '11px'
                    }}
                  >
                    <Title level={3}>{(group += 1)}</Title>
                    <Radio.Group
                      key={group}
                      name="solution"
                      defaultValue={
                        solution[problem.alternatives[i].id][
                          problem.alternatives[k].id
                        ]
                      }
                      onChange={(data) =>
                        handleChange(
                          data.target.value,
                          problem.alternatives[i].id,
                          problem.alternatives[k].id
                        )
                      }
                    >
                      <Space direction="vertical" size="large">
                        <Radio value={1}>
                          <Text strong>
                            {'Альтернатива 1: '}
                            {problem.alternatives[i].formulation}
                          </Text>
                        </Radio>
                        <Radio value={0.0}>
                          <Text strong>
                            {'Альтернатива 2: '}
                            {problem.alternatives[k].formulation}
                          </Text>
                        </Radio>
                        <Radio value={0.5}>
                          <Text>Равнозначны</Text>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Space>
                )
            )
          )}
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

export default PairComparisons;
