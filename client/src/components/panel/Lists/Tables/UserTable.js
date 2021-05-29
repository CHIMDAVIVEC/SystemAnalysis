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
    render: (text, record) => <Link to={`/user/${record._id}`}>{text}</Link>,
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
    title: 'Роль',
    dataIndex: 'role',
    key: 'role',
    render: (text, record) => (text === 'analyst' ? 'Аналитик' : 'Эксперт'),
    filters: [
      {
        text: 'Аналитик',
        value: 'analyst'
      },
      {
        text: 'Эксперт',
        value: 'expert'
      }
    ],
    onFilter: (value, record) => record.role.indexOf(value) === 0
  },

  {
    title: 'E-Mail',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['ascend', 'descend']
  }
];

//Описание таблицы пользователей
function UserTable({ data }) {
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

export default UserTable;
