import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Typography, Slider, Popconfirm } from 'antd';

const { Title, Text } = Typography;

//Метод полного попарного сопоставления
function CompletePairwises({ problem, onClick, loading, array }) {
  const altlen = problem.alternatives.length;
  const [solution, setSolution] = useState([]);
  const [hack, setHack] = useState(0);

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
          if (i !== k) {
            temp[i][k] = null;
          } else {
            temp[i][k] = 0;
          }
        }
      }
      setSolution(temp);
    }
  }, []);

  function handleChange(value, i, k) {
    let temp = solution;
    temp[i][k] = value / problem.scale;
    temp[k][i] = 1 - value / problem.scale;
    setSolution(temp);
    setHack(value);
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
          {'Используйте ползунок, чтобы выбрать'}
          <br />
          {'в скольких случаях из '}
          {problem.scale}
          {' альтернатива №1 предпочтительней альтернативы №2'}
        </Title>
        <div
          className="row justify-content-center align-items-center"
          style={{ height: '58vh', overflow: 'auto' }}
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
                    <Title level={4}>{(group += 1)}</Title>

                    <div>
                      <Text strong>
                        {'Альтернатива 1: '}
                        {problem.alternatives[i].formulation}
                      </Text>
                      <br />
                      <Text strong>
                        {'Альтернатива 2: '}
                        {problem.alternatives[k].formulation}
                      </Text>
                      <Slider
                        min={0}
                        max={problem.scale}
                        defaultValue={
                          solution[problem.alternatives[i].id][
                            problem.alternatives[k].id
                          ] * problem.scale
                        }
                        value={
                          solution[problem.alternatives[i].id][
                            problem.alternatives[k].id
                          ] * problem.scale
                        }
                        style={{
                          clear: 'both',
                          width: '67%',
                          margin: 'left'
                        }}
                        onChange={(value) =>
                          handleChange(
                            value,
                            problem.alternatives[i].id,
                            problem.alternatives[k].id
                          )
                        }
                      />
                      <Text strong>
                        {'Текущее значение для альтернативы №1: '}
                        {solution[problem.alternatives[i].id][
                          problem.alternatives[k].id
                        ] * problem.scale}
                        {'/'}
                        {problem.scale}
                      </Text>
                    </div>
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

export default CompletePairwises;
