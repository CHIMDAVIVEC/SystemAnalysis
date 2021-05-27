import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  TableOutlined,
  HomeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SidebarStyled from '../styles/SidebarStyled';

const { Title } = Typography;
const { Sider } = Layout;

function Sidebar({ role, collapsed, index, loggedInUserId }) {
  return (
    <SidebarStyled collapsed={!collapsed}>
      <Sider trigger={null} collapsible collapsed={!collapsed}>
        <div className="logo">
          <Title level={2}>МЕНЮ</Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="sidebar-items"
          defaultSelectedKeys={[index]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link className="text-white" to="/home">
              Домой
            </Link>
          </Menu.Item>

          {role === 'admin' && (
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link className="text-white" to="/users">
                Пользователи
              </Link>
            </Menu.Item>
          )}

          {role === 'analyst' && (
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link className="text-white" to="/experts">
                Эксперты
              </Link>
            </Menu.Item>
          )}

          <Menu.Item key="3" icon={<TableOutlined />}>
            <Link className="text-white" to="/problems">
              Проблемы
            </Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link className="text-white" to={`/user/${loggedInUserId}`}>
              Настройки
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </SidebarStyled>
  );
}

export default Sidebar;
