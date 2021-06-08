import React from 'react';
import { Table, Progress, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { checkRole, getId } from '../../../../helpers/checkAuth';

const role = checkRole();
const id = getId();

const columns = [
  {
    title: 'ID',
    dataIndex: 'Id',
    key: 'Id',
    sorter: (a, b) => a.Id - b.Id,
    sortDirections: ['ascend', 'descend'],
    defaultSortOrder: 'ascend'
  },
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Link
        to={
          role === 'analyst'
            ? `/analyst/problem/${record._id}`
            : role === 'expert'
            ? `/expert/problem/${record._id}`
            : '/403'
        }
      >
        {text}
      </Link>
    ),
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend']
  },

  {
    title: 'Прогресс',
    dataIndex: 'progress',
    key: 'progress',
    render: (text, record) => (
      <Progress width={33} type="circle" percent={text}>
        {text}
      </Progress>
    ),
    sorter: (a, b) => a.progress - b.progress,
    sortDirections: ['ascend', 'descend']
  },

  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'Открыта',
        value: 'Открыта'
      },
      {
        text: 'Оценивается',
        value: 'Оценивается'
      },
      {
        text: 'Решена',
        value: 'Решена'
      }
    ],
    render: (text, record) => (
      <Badge
        status={
          text === 'Открыта'
            ? 'default'
            : text === 'Оценивается'
            ? 'processing'
            : 'success'
        }
        text={text}
      />
    ),
    onFilter: (value, record) => record.status.indexOf(value) === 0
  }
];

//Описание таблицы проблем
function ProblemTable({ data }) {
  if (data === '') data = [];
  role === 'analyst'
    ? (data = data.filter((record) => record.analyst === id))
    : (data = data.filter((record) =>
        record.experts.find((expert) => expert.id === id)
      ));
  data.forEach((record, k) => {
    record.Id = k + 1;
  });
  return (
    <>
      <Table
        locale={{ emptyText: 'Нет данных' }}
        className="clearfix"
        columns={columns}
        rowKey="Id"
        dataSource={data}
        style={{ clear: 'both' }}
        pagination={false}
      />
    </>
  );
}

export default ProblemTable;
