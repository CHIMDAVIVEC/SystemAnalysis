import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Descriptions,
  Form,
  Button,
  Collapse,
  Space,
  Input,
  Popconfirm,
  Progress,
  Badge
} from 'antd';
import { ProblemContext } from '../../../context/problem/problemContext';
import { UserContext } from '../../../context/user/userContext';
import Loader from '../../Loader/Loader';
import HOC from '../HOC';

const { Panel } = Collapse;
const { TextArea } = Input;

//Страница данных проблемы для аналитика
function AnalystPOV(props) {
  const { state, fetchSingleProblem, setSolved, deleteProblem } =
    useContext(ProblemContext);

  const id = props.match.params.id;

  useEffect(() => {
    async function fetchData() {
      await fetchSingleProblem(id);
    }
    fetchData();
  }, [fetchSingleProblem, id]);

  const { users } = useContext(UserContext).state;
  const experts = Object.values(users).filter((user) => user.role === 'expert');
  const { problem } = state;

  const onConfirmDelete = () => {
    deleteProblem(id).then(() => window.location.replace('/problems'));
  };

  const onClick = () => {
    let values = {
      ...problem,
      status: 'Оценивается'
    };
    setSolved(values);
  };

  return (
    <>
      {problem ? (
        <>
          {problem.status === 'Открыта' && (
            <Popconfirm
              title="Вы уверены?"
              onConfirm={onConfirmDelete}
              okText="Удалить"
              cancelText="Закрыть"
            >
              <Button className="float-right" danger>
                Удалить проблему
              </Button>
            </Popconfirm>
          )}
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
              <Descriptions.Item label="Формулировка" span={2}>
                <TextArea
                  autoSize={{ minRows: 1, maxRows: 10 }}
                  cols={50}
                  defaultValue={problem.formulation}
                  disabled={true}
                  style={{ background: 'white', color: 'black' }}
                />
              </Descriptions.Item>
              {problem.status !== 'Открыта' && (
                <Descriptions.Item label="Решение">
                  <Button type="primary" className="mr-2">
                    <Link to={`/problem/result/${problem._id}`}>
                      Перейти к результату
                    </Link>
                  </Button>
                </Descriptions.Item>
              )}
            </Descriptions>
            <Descriptions layout="horizontal">
              <Descriptions.Item label="Шкала оценки" span={3}>
                {problem.scale}
              </Descriptions.Item>
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
              <Collapse>
                <Panel header="Эксперты" key="1">
                  {experts
                    .filter((expert) =>
                      problem.experts.map((exs) => exs.id).includes(expert._id)
                    )
                    .map((expert, i) => (
                      <Link key={i} to={`/expert/${expert._id}`}>
                        <p key={i} value={expert._id}>
                          {'№' + (i + 1)} {expert.name} {expert.surname} {': '}{' '}
                          {problem.experts[i].R}
                        </p>
                      </Link>
                    ))}
                </Panel>
              </Collapse>
            </Space>
            <div
              className="row justify-content-center align-items-center"
              style={{ marginTop: '5%' }}
            >
              <div className="align-self-center text-center">
                <Space direction="vertical">
                  {problem.status === 'Открыта' && (
                    <Popconfirm
                      title={
                        'Это разрешит экспертам начать оценивание, но запретит вам удаление проблемы. Вы уверены?'
                      }
                      onConfirm={() => {
                        onClick();
                      }}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <Button type="primary" className="mr-2">
                        Разрешить оценивание
                      </Button>
                    </Popconfirm>
                  )}
                  {problem.status !== 'Решена' && (
                    <Button type="info" className="login-form-button">
                      <Link to={`/problem/${problem._id}`}>Редактировать</Link>
                    </Button>
                  )}
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

export default HOC(AnalystPOV);
