import styled from 'styled-components';

const SidebarStyled = styled.div`
  background: linear-gradient(to top, #f0f2f5 20%, #283E51 68%);

  .ant-layout-sider-collapsed {
    font-size: 0.5rem;
  }
  .logo {
    background: linear-gradient(to bottom, #ffffff, #283E51 74%);
    h2 {
      color: #fff;
      font-weight: 700;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: ${(props) => (props.collapsed ? '1rem ' : '1rem 0rem 2rem 0px')};
      font-size: ${(props) => (props.collapsed ? '0.9rem ' : '1.875rem')};
    }
  }
  .sidebar-items {
    background: #283E51;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background: transparent;
    font-weight: 700;
  }

  .ant-menu-item {
    display: flex;
    align-items: center;

    font-size: 1rem !important;
  }
`;

export default SidebarStyled;
