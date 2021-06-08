import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Button, Typography, Popconfirm, Table } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import PrefencesStyled from '../../../../styles/PrefencesStyled';
const { Title, Text } = Typography;

const type = 'DragableBodyRow';

const DragableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    }
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const columns = [
  {
    title: 'Альтернативы',
    dataIndex: 'formulation',
    key: 'id',
    render: (text) => <Text strong>{text}</Text>
  }
];

//Метод предпочтений
const Prefences: React.FC = ({ problem, onClick, loading, array }) => {
  const [data, setData] = useState([{}]);
  const altlen = problem.alternatives.length;

  function handleSolution(solved) {
    let temp = new Array(altlen);
    data.forEach((e, i) => (temp[e.id] = i + 1));
    let values = { solution: temp };
    onClick(values, solved);
  }

  useEffect(() => {
    let temp = [];

    if (array.length === altlen) {
      temp = new Array(altlen);
      let alt;
      array.forEach((v, i) => {
        alt = problem.alternatives.find((a) => a.id === i);
        temp[v - 1] = { id: alt.id, formulation: alt.formulation };
      });
      setData(temp);
    } else {
      temp = [];
      problem.alternatives.forEach((alt) =>
        temp.push({ id: alt.id, formulation: alt.formulation })
      );
      setData(temp);
    }
  }, []);

  const components = {
    body: {
      row: DragableBodyRow
    }
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow]
          ]
        })
      );
    },
    [data]
  );

  return (
    <PrefencesStyled>
      <Form
        name="problem_details_form"
        className="login-form"
        layout="vertical"
        size="large"
        style={{ clear: 'both' }}
      >
        <Title level={4}>
          {'Расположите альтернативы в порядке значимости'}
          <br />
          {'Выше - значимее'}
        </Title>
        <div
          className="row justify-content-center align-items-center"
          style={{ height: '58vh', overflow: 'auto' }}
        >
          <DndProvider backend={HTML5Backend}>
            <Table
              style={{ width: '33%' }}
              columns={columns}
              dataSource={data}
              components={components}
              onRow={(record, index) => ({
                index,
                moveRow
              })}
              pagination={false}
            />
          </DndProvider>
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
                onClick={() => handleSolution(1)}
              >
                Отправить
              </Button>
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="mr-2"
                disabled={loading}
                onClick={() => handleSolution(0)}
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
    </PrefencesStyled>
  );
};

export default Prefences;
