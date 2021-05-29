import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Descriptions,
  Form,
  Button,
  Space,
  Input,
  List,
  Radio,
  Popconfirm
} from 'antd';
import { ProblemContext } from '../../../../context/problem/problemContext';
import { UserContext } from '../../../../context/user/userContext';
import Loader from '../../../Loader/Loader';
import HOC from '../../HOC';

const { TextArea } = Input;

//Страница просмотра результатов решения
function Results(props) {
  const { state, setSolved, fetchSingleProblem } = useContext(ProblemContext);
  const { problem } = state;
  const id = props.match.params.id;
  const [method, setMethod] = useState(1);
  const [exp, setExp] = useState(-1);
  const { users } = useContext(UserContext).state;
  const experts = Object.values(users).filter((user) => user.role === 'expert');

  useEffect(() => {
    async function fetchData() {
      await fetchSingleProblem(id);
    }
    fetchData();
  }, [fetchSingleProblem, id]);

  function handleChange(value) {
    setMethod(value);
  }

  function handleChangeE(value) {
    setExp(value);
  }

  function toSort() {
    const data = JSON.parse(JSON.stringify(problem));
    switch (exp) {
      case -1:
        let sortedList = eval(
          `data.alternatives.sort((a, b) => b.result.method${method} - a.result.method${method})`
        );
        var k = 1;
        sortedList[0] = {
          ...sortedList[0],
          rank: k
        };
        for (let i = 1; i < sortedList.length; i += 1) {
          if (
            eval(`sortedList[i - 1].result.method${method}`) !==
            eval(`sortedList[i].result.method${method}`)
          )
            k += 1;
          sortedList[i] = {
            ...sortedList[i],
            rank: k
          };
        }
        return sortedList;
      default:
        let correct = method;
        if (method > 2) correct -= 1;
        let temp = data.alternatives;
        let expert = data.experts.find((expert) => expert.id === exp);
        for (var i = 0; i < temp.length; i += 1) {
          eval(
            `temp[i].result.method${method} = ("[" + expert.solutions.method${correct}.values[i] + "]")`
          );
        }
        for (let i = 0; i < temp.length; i += 1) {
          temp[i] = {
            ...temp[i],
            rank: temp[i].id + 1
          };
        }
        return temp;
    }
  }

  const handleClick = (values) => {
    values = {
      ...problem,
      status: 'Решена'
    };
    setSolved(values);
  };

  return (
    <>
      {problem && problem.status !== 'Открыта' ? (
        <>
          <Form
            name="problem_details_form"
            className="login-form"
            layout="vertical"
            size="large"
            style={{ clear: 'both' }}
          >
            <Descriptions title="Просмотр решения">
              <Descriptions.Item label="Название проблемы" span={2}>
                <TextArea
                  autoSize={{ minRows: 1, maxRows: 10 }}
                  cols={40}
                  defaultValue={problem.name}
                  disabled={true}
                  style={{ background: 'white', color: 'black' }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Метод решения">
                <Radio.Group
                  defaultValue={1}
                  name="method"
                  onChange={(data) => handleChange(data.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value={1}>Метод парных сравнений</Radio>
                    <Radio value={2}>Взвешенных экспертных оценок</Radio>
                    <Radio value={4}>Предпочтения</Radio>
                    <Radio value={5}>Ранга</Radio>
                    <Radio value={6}>Полного попарного сопоставления</Radio>
                  </Space>
                </Radio.Group>
              </Descriptions.Item>
            </Descriptions>
            <Space direction="vertical" style={{ width: '30%' }}>
              <Radio.Group
                defaultValue={-1}
                name="expert"
                onChange={(data) => handleChangeE(data.target.value)}
              >
                <Space direction="vertical">
                  <Radio value={-1}>Все</Radio>
                  {experts
                    .filter((expert) =>
                      problem.experts.map((exs) => exs.id).includes(expert._id)
                    )
                    .map((expert, i) => (
                      <Radio value={expert._id} key={i}>
                        {expert.name} {expert.surname} {': '} {expert.rating}
                      </Radio>
                    ))}
                </Space>
              </Radio.Group>
              <br />
              {(method === 2 || method === 3) && (
                <Radio.Group
                  name="method"
                  defaultValue={2}
                  onChange={(data) => handleChange(data.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value={2}>
                      На основе должности и ученой степени
                    </Radio>
                    <Radio value={3}>
                      На основе аргументации и информированности
                    </Radio>
                  </Space>
                </Radio.Group>
              )}
              <br />
            </Space>
            <List
              header={'Альтернативы:'}
              bordered
              size="small"
              dataSource={toSort()}
              renderItem={(alternative, k) => (
                <List.Item>
                  {alternative.rank}
                  {': '} {'(№' + (alternative.id + 1) + ')'}
                  {alternative.formulation} {': '}{' '}
                  {eval(`alternative.result.method${method}`) !==
                    '[undefined]' &&
                  eval(`alternative.result.method${method}`) !== null
                    ? exp === -1
                      ? parseFloat(
                          eval(`alternative.result.method${method}`).toFixed(3)
                        )
                      : eval(`alternative.result.method${method}`)
                    : 'решение еще не представлено'}
                </List.Item>
              )}
            ></List>
            <div
              className="row justify-content-center align-items-center"
              style={{ marginTop: '5%' }}
            >
              <div className="align-self-center text-center">
                <Space direction="vertical">
                  <Button type="info" className="mr-2">
                    <Link to="/problems">Обратно</Link>
                  </Button>
                  {problem.status === 'Решается' && (
                    <Popconfirm
                      title="Вы уверены?"
                      onConfirm={handleClick}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <Button type="primary" htmlType="submit" className="mr-2">
                        Закрыть проблему
                      </Button>
                    </Popconfirm>
                  )}
                </Space>
              </div>
            </div>
          </Form>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default HOC(Results);
