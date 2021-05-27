import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Radio,
  Space,
  Typography,
  InputNumber,
  Popconfirm
} from 'antd';

const { Title, Text } = Typography;

function PairComparisons({ problem, onClick, loading, array }) {
  const [current, setCurrent] = useState(1);
  const [solution, setSolution] = useState([]);
  const [scale, setScale] = useState(1);
  const [temp, setTemp] = useState([]);
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
    if (value === 2) {
      temp[i][k] = temp[i] / scale;
      temp[k][i] = 1 - temp[i] / scale;
    } else {
      temp[i][k] = value;
      temp[k][i] = 1 - value;
    }
    setSolution(temp);
  }

  function handleChangeScale(value) {
    setScale(value);
  }

  function handleChangeTemp(value, i) {
    let tempVal = temp;
    tempVal[i] = value;
    setTemp(tempVal);
  }

  let count = (altlen * (altlen - 1)) / 2;
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
          {solution.map((column, i) =>
            column.map(
              (row, k) =>
                i < k &&
                current === (group += 1) && (
                  <Space direction="vertical" style={{ width: '50%' }}>
                    <Title level={2}>
                      {group}
                      {'/'}
                      {count}
                    </Title>
                    <Space>
                      <Title level={4}>{'Задайте размер шкалы:'}</Title>
                      <InputNumber
                        name="scale"
                        defaultValue={scale}
                        min={1}
                        step={1}
                        onChange={(value) => handleChangeScale(value)}
                      />
                    </Space>

                    <Title level={4}>
                      {'Выберите наиболее предпочтительную альтернативу'}
                    </Title>
                    <Radio.Group
                      key={group}
                      name="solution"
                      defaultValue={solution[i][k]}
                      onChange={(data) => handleChange(data.target.value, i, k)}
                    >
                      <Space direction="vertical">
                        <Radio value={1}>
                          <Text strong>
                            {problem.alternatives[i].formulation}
                          </Text>
                        </Radio>
                        <Radio value={2}>
                          <Text strong>
                            Первая альтернатива предпочтительнее в{' '}
                            <InputNumber
                              name="scale"
                              size="small"
                              defaultValue={temp[i]}
                              min={1}
                              max={scale}
                              step={1}
                              onChange={(value) => handleChangeTemp(value, i)}
                            />{' '}
                            случаях из {scale}
                          </Text>
                        </Radio>
                        <Radio value={0.0}>
                          <Text strong>
                            {problem.alternatives[k].formulation}
                          </Text>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Space>
                )
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

export default PairComparisons;
