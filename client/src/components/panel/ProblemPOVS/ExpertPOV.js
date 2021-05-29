import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Descriptions,
  Form,
  Button,
  Collapse,
  Space,
  Input,
  Radio,
  Badge,
  Progress,
  Popconfirm
} from 'antd';
import { ProblemContext } from '../../../context/problem/problemContext';
import Loader from '../../Loader/Loader';
import HOC from '../HOC';

const { Panel } = Collapse;
const { TextArea } = Input;

//Страница данных проблемы для эксперта
function ExpertPOV(props) {
  const { state, editProblem, fetchSingleProblem } = useContext(ProblemContext);
  const { problem } = state;
  const id = props.match.params.id;
  const [method, setMethod] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await fetchSingleProblem(id);
    }
    fetchData();
  }, [fetchSingleProblem, id]);

  const onClick = () => {
    var values = problem;
    if (values.status === 'Открыта') {
      const temp = { experts: [], alternatives: [] };

      problem.experts.forEach((item) => {
        temp.experts.push(item.id);
      });
      console.log(problem);
      problem.alternatives.forEach((item) => {
        temp.alternatives.push(item.formulation);
      });

      values.alternatives = temp.alternatives;
      values.experts = temp.experts;
      values.status = 'Решается';
      editProblem(values);
    }
  };

  function isUnsolved(meth) {
    return problem.alternatives
      .map((alt) => eval(`alt.result.method${meth}`))
      .includes(null);
  }

  function handleChange(value) {
    setMethod(value);
  }

  return (
    <>
      {problem ? (
        <>
          <Form
            name="problem_details_form"
            className="login-form"
            layout="vertical"
            size="large"
            style={{ clear: 'both' }}
          >
            <Descriptions title="Статус проблемы" layout="vertical">
              <Descriptions.Item label="Название" span={2}>
                <TextArea
                  autoSize={{ minRows: 1, maxRows: 10 }}
                  cols={50}
                  defaultValue={problem.name}
                  disabled={true}
                  style={{ background: 'white', color: 'black' }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Статус">
                <Badge
                  status={
                    problem.status === 'Открыта'
                      ? 'default'
                      : problem.status === 'Решается'
                      ? 'processing'
                      : 'success'
                  }
                  text={problem.status}
                />
                {'  '}
                <Progress
                  width={40}
                  type="circle"
                  percent={problem.progress}
                />{' '}
              </Descriptions.Item>
              <Descriptions.Item span={2}>
                <Space direction="vertical">
                  <label>Формулировка:</label>
                  <TextArea
                    autoSize={{ minRows: 1, maxRows: 10 }}
                    cols={50}
                    defaultValue={problem.formulation}
                    disabled={true}
                    style={{ background: 'white', color: 'black' }}
                  />
                </Space>
              </Descriptions.Item>
              {problem.status !== 'Решена' && (
                <Descriptions.Item label="Метод решения">
                  <Space direction="vertical">
                    <Radio.Group
                      name="method"
                      defaultValue={method}
                      onChange={(data) => handleChange(data.target.value)}
                    >
                      <Space direction="vertical">
                        {isUnsolved(1) && (
                          <Radio value={1}>Парных сравнений</Radio>
                        )}
                        {isUnsolved(2) && (
                          <Radio value={2}>Взвешенных экспертных оценок</Radio>
                        )}
                        {isUnsolved(4) && <Radio value={3}>Предпочтения</Radio>}
                        {isUnsolved(5) && <Radio value={4}>Ранга</Radio>}
                        {isUnsolved(6) && (
                          <Radio value={5}>
                            Полного попарного сопоставления
                          </Radio>
                        )}
                      </Space>
                    </Radio.Group>
                    {problem.status === 'Открыта' ? (
                      <Popconfirm
                        title={"Это сменит статус на 'Решается'. Вы уверены?"}
                        onConfirm={() => {
                          onClick();
                          window.location.replace(
                            `/problem/solving/${problem._id}/${method}`
                          );
                        }}
                        okText="Да"
                        cancelText="Нет"
                      >
                        <Button
                          type="primary"
                          className="mr-2"
                          disabled={method !== 0 ? false : true}
                        >
                          Перейти к решению
                        </Button>
                      </Popconfirm>
                    ) : (
                      <Button
                        type="primary"
                        className="mr-2"
                        onClick={onClick}
                        disabled={method !== 0 ? false : true}
                      >
                        <Link to={`/problem/solving/${problem._id}/${method}`}>
                          Перейти к решению
                        </Link>
                      </Button>
                    )}
                  </Space>
                </Descriptions.Item>
              )}
            </Descriptions>
            <Space direction="vertical">
              <Collapse>
                <Panel header="Альтернативы" key="1">
                  {problem.alternatives.map((alternative, k) => (
                    <p key={k}>
                      {'№' + (k + 1)} {alternative.formulation}
                    </p>
                  ))}
                </Panel>
              </Collapse>
            </Space>
            <div
              className="row justify-content-center align-items-center"
              style={{ marginTop: '5%' }}
            >
              <div className="align-self-center text-center">
                <Space direction="horizontal">
                  <Button type="info" className="login-form-button">
                    <Link to="/problems">Обратно</Link>
                  </Button>
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

export default HOC(ExpertPOV);
