import React from 'react';
import { Layout, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import HeaderStyled from '../styles/HeaderStyled';

const { Header } = Layout;

function PageHeader({ collapsed, toggle, history, name, surname }) {

  const handleLogout = () => {
    localStorage.removeItem('howard_shores');
    history.push('/user/login');
  };

  return (
    <HeaderStyled>
      <Header className="site-layout-background">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: toggle
          }
        )}
        <div className=" float-right d-flex mr-2">
          <div className="name-header mx-3">
          <span className="name">{name} {surname}</span>
              <Button danger
                onClick={() => handleLogout()}
              >
                Выйти
              </Button>
          </div>
        </div>
      </Header>
    </HeaderStyled>
  );
}

export default PageHeader;
