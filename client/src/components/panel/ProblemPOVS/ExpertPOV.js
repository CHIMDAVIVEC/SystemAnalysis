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
  Progress
} from 'antd';
import { ProblemContext } from '../../../context/problem/problemContext';
import Loader from '../../Loader/Loader';
import HOC from '../HOC';

const { Panel } = Collapse;
const { TextArea } = Input;

//Страница данных проблемы для эксперта
function ExpertPOV(props) {
  const { state, fetchSingleProblem } = useContext(ProblemContext);
  const { problem } = state;
  const id = props.match.params.id;
  const [method, setMethod] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await fetchSingleProblem(id);
    }
    fetchData();
  }, [fetchSingleProblem, id]);

  function isUnsolved(meth) {
    return problem.alternatives
      .map((alt) => eval(`alt.result.method${meth}`))
      .includes(null);
  }

  function handleChange(value) {
    setMethod(value);
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
                      : problem.status === 'Оценивается'
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
              {problem.status === 'Оценивается' && (
                <Descriptions.Item label="Метод оценивания">
                  <Space direction="vertical" size="middle">
                    <Radio.Group
                      name="method"
                      defaultValue={method}
                      onChange={(data) => handleChange(data.target.value)}
                    >
                      <Space direction="horizontal">
                        {isUnsolved(1) && <Radio value={1}>№1</Radio>}
                        {isUnsolved(2) && <Radio value={2}>№2</Radio>}
                        {isUnsolved(3) && <Radio value={3}>№3</Radio>}
                        {isUnsolved(4) && <Radio value={4}>№4</Radio>}
                        {isUnsolved(5) && <Radio value={5}>№5</Radio>}
                      </Space>
                    </Radio.Group>
                    <Button
                      type="primary"
                      className="mr-2"
                      disabled={method !== 0 ? false : true}
                    >
                      <Link to={`/problem/solving/${problem._id}/${method}`}>
                        Перейти к оцениванию
                      </Link>
                    </Button>
                  </Space>
                </Descriptions.Item>
              )}
            </Descriptions>
            <Space direction="vertical">
              <Collapse>
                <Panel header="Альтернативы" key="1">
                  {shuffle(problem.alternatives).map((alternative, k) => (
                    <p key={k}>{alternative.formulation}</p>
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
