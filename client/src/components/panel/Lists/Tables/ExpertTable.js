import React from 'react';

import { Table } from 'antd';
import { Link } from 'react-router-dom';

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
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`/expert/${record._id}`}>{text}</Link>,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend']
  },

  {
    title: 'Фамилия',
    dataIndex: 'surname',
    key: 'surname',
    sorter: (a, b) => a.surname.localeCompare(b.surname),
    sortDirections: ['ascend', 'descend']
  },

  {
    title: 'Оценка',
    dataIndex: 'rating',
    key: 'rating',
    sorter: (a, b) => a.Id - b.Id,
    sortDirections: ['ascend', 'descend']
  },

  {
    title: 'Профессия',
    dataIndex: 'profession',
    key: 'profession'
  },

  {
    title: 'E-Mail',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['ascend', 'descend']
  }
];

function ExpertTable({ data }) {
  if (data === '') data = [];
  data = data.filter((record) => record.role === 'expert');
  data.forEach((record, k) => {
    record.Id = k + 1;
  });
  return (
    <>
      <Table
        locale={{ emptyText: 'Нет данных' }}
        className="clearfix"
        columns={columns}
        dataSource={data}
        rowKey="Id"
        style={{ clear: 'both' }}
      />
    </>
  );
}

export default ExpertTable;
