import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Select,
  Space,
  Typography,
  message,
  Popconfirm
} from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

//Метод предпочтений
function Prefences({ problem, onClick, loading, array }) {
  const [current, setCurrent] = useState(1);
  const [solution, setSolution] = useState([]);
  const [list, setList] = useState([]);
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
    let tempL = [];

    if (array.length === altlen) setSolution(array);
    else {
      for (let i = 0; i < altlen; i += 1) temp[i] = null;
      setSolution(temp);
    }

    for (let i = 0; i < altlen; i += 1) tempL[i] = i + 1;
    setList(tempL);
  }, []);

  function handleChange(value, i) {
    checkIfChecked(value);
    let temp = solution;
    temp[i] = value;
    setSolution(temp);
  }

  const checkIfChecked = (value) => {
    for (let i = 0; i < altlen; i += 1) {
      if (solution[i] === value) message.error('Такая оценка уже есть!');
    }
  };

  let count = altlen;
  let group = 0;
  console.log(solution);
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
                  <Title level={4}>
                    {'Оцените альтернативу:'}
                    <br />
                    {'Наиболее важная - 1'}
                    <br />
                    {'Наименее важная - n (число альтернатив)'}
                    <br />
                    {'Оценки не должы совпадать'}
                  </Title>
                  <Space direction="vertical" style={{ width: '60%' }}>
                    <Text strong>{problem.alternatives[i].formulation}:</Text>
                    <Select
                      style={{ width: '100%' }}
                      onSelect={(value) => handleChange(value, i)}
                      defaultValue={solution[i]}
                    >
                      {list.map((elem, k) => (
                        <Option key={k} value={list[k]}>
                          {list[k]}
                        </Option>
                      ))}
                    </Select>
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

export default Prefences;
