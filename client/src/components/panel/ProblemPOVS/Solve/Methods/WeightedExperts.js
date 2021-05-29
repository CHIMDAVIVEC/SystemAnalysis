import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Radio,
  Space,
  Typography,
  InputNumber,
  message,
  Popconfirm
} from 'antd';

const { Title, Text } = Typography;

//Метод взвешенных экспертных оценок
function WeightedExperts({ problem, onClick, loading, array, Ru }) {
  const [current, setCurrent] = useState(1);
  const [solution, setSolution] = useState([]);
  const [tempRa, setTempRa] = useState([null, null, null, null, null, null]);
  const [Runf, setRu] = useState();
  const [sum, setSum] = useState(1);
  const altlen = problem.alternatives.length;

  let values = {
    solution: solution.slice(2),
    Ra: tempRa,
    Ru: Runf
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    let temp = [];

    if (Ru !== null) setRu(Ru);
    else setRu(null);

    if (array.length === altlen) {
      let summary = 0;
      for (let i = 0; i < altlen; i += 1) summary += array[i];
      array.unshift(Runf);
      array.unshift(null);
      setSolution(array);
      setSum(1.0 - summary);
    } else {
      for (let i = 0; i < altlen; i += 1) temp[i] = null;
      temp.unshift(Runf);
      temp.unshift(null);
      setSolution(temp);
      setSum(1);
    }
  }, []);
  let max = 1;
  function handleChange(value, i) {
    let tempSum;
    tempSum = sum - (value - solution[i]);
    setSum(parseFloat(tempSum.toFixed(3)));
    console.log(sum);
    if (sum < 0.0) {
      message.error('Сумма оценок превышает 1!');
      max = 0;
    }
    let tempSol = solution;
    tempSol[i] = value;
    setSolution(tempSol);
  }

  function handleRa(value, i) {
    let temp = tempRa;
    if (i > 1) temp[i] = 0.05;
    else temp[i] = value;
    setTempRa(temp);
  }

  let count = altlen + 2;
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
                  {current > 2 && (
                    <Space direction="vertical">
                      <Title level={4}>
                        {'Дайте оценку альтернативе от 0 до 1'}
                        <br />
                        {'Сумма всех оценок не должна превышать 1'}
                      </Title>
                      <Text strong>
                        {problem.alternatives[i - 2].formulation}:
                      </Text>
                      <InputNumber
                        key={group}
                        name="solution"
                        defaultValue={solution[i]}
                        min={0}
                        max={max}
                        step={0.1}
                        onChange={(value) => handleChange(value, i)}
                      />
                    </Space>
                  )}
                  {current === 1 && (
                    <Space direction="vertical">
                      <Title level={3}>Выберите подходящее утверждение</Title>
                      <Radio.Group
                        key={1}
                        name="Ru"
                        defaultValue={Runf}
                        onChange={(data) => setRu(data.target.value)}
                      >
                        <Space direction="vertical">
                          <Radio value={0}>
                            Я совершенно не осведомлен о проблеме
                          </Radio>
                          <Radio value={2}>
                            Я поверхностно знаком с проблемой, но заинтересован
                            в ней
                          </Radio>
                          <Radio value={5}>
                            Я знаком с проблемой, но не участвую в её решении
                          </Radio>
                          <Radio value={8}>
                            Я знаком с проблемой и участвую в её решении
                          </Radio>
                          <Radio value={10}>Я отлично знаю проблему</Radio>
                        </Space>
                      </Radio.Group>
                    </Space>
                  )}
                  {current === 2 && (
                    <Space direction="vertical">
                      <Title level={3}>
                        Выберите степень влияния источника на ваше мнение
                      </Title>
                      <Title level={4}>
                        (Ответы не сохраняются для повторного решения)
                      </Title>
                      <Text strong>Проведенный вами теоретический анализ</Text>
                      <Radio.Group
                        key={0}
                        name="Ra1"
                        defaultValue={Runf}
                        onChange={(data) => handleRa(data.target.value, 0)}
                      >
                        <Space direction="horizontal">
                          <Radio value={0.3}>Высокая</Radio>
                          <Radio value={0.2}>Средняя</Radio>
                          <Radio value={0.1}>Низкая</Radio>
                        </Space>
                      </Radio.Group>

                      <Text strong>Ваш производственный опыт</Text>
                      <Radio.Group
                        key={1}
                        name="Ra2"
                        defaultValue={Runf}
                        onChange={(data) => handleRa(data.target.value, 1)}
                      >
                        <Space direction="horizontal">
                          <Radio value={0.5}>Высокая</Radio>
                          <Radio value={0.4}>Средняя</Radio>
                          <Radio value={0.2}>Низкая</Radio>
                        </Space>
                      </Radio.Group>

                      <Text strong>Обобщение работ отечественных авторов</Text>
                      <Radio.Group
                        key={2}
                        name="Ra3"
                        defaultValue={Runf}
                        onChange={(data) => handleRa(data.target.value, 2)}
                      >
                        <Space direction="horizontal">
                          <Radio value={1}>Высокая</Radio>
                          <Radio value={2}>Средняя</Radio>
                          <Radio value={3}>Низкая</Radio>
                        </Space>
                      </Radio.Group>

                      <Text strong>Обобщение работ зарубежных авторов</Text>
                      <Radio.Group
                        key={3}
                        name="Ra4"
                        defaultValue={Runf}
                        onChange={(data) => handleRa(data.target.value, 3)}
                      >
                        <Space direction="horizontal">
                          <Radio value={1}>Высокая</Radio>
                          <Radio value={2}>Средняя</Radio>
                          <Radio value={3}>Низкая</Radio>
                        </Space>
                      </Radio.Group>

                      <Text strong>
                        Ваше личное знакомство с состоянием дел за рубежом
                      </Text>
                      <Radio.Group
                        key={4}
                        name="Ra5"
                        defaultValue={Runf}
                        onChange={(data) => handleRa(data.target.value, 4)}
                      >
                        <Space direction="horizontal">
                          <Radio value={1}>Высокая</Radio>
                          <Radio value={2}>Средняя</Radio>
                          <Radio value={3}>Низкая</Radio>
                        </Space>
                      </Radio.Group>

                      <Text strong>Ваша интуиция</Text>
                      <Radio.Group
                        key={5}
                        name="Ra6"
                        defaultValue={Runf}
                        onChange={(data) => handleRa(data.target.value, 5)}
                      >
                        <Space direction="horizontal">
                          <Radio value={1}>Высокая</Radio>
                          <Radio value={2}>Средняя</Radio>
                          <Radio value={3}>Низкая</Radio>
                        </Space>
                      </Radio.Group>
                    </Space>
                  )}
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
              {sum >= 0 && (
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
              )}
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

export default WeightedExperts;
