import React, { useState, useEffect, useContext } from 'react';
import { Layout, message } from 'antd';
import { UserContext } from '../../context/user/userContext';
import { ProblemContext } from '../../context/problem/problemContext';
import { checkRole } from '../../helpers/checkAuth';
import Sidebar from './Sidebar';
import PageHeader from './Header';
import PageFooter from './Footer';

function HOC(Component, index) {
  return function DashboardCustomHoc(props) {
    const [collapsed, setCollapsed] = useState(true);
    const handleSetCollapsed = () => {
      setCollapsed(!collapsed);
    };
    const { state, UserReset } = useContext(UserContext);
    const { ProblemReset } = useContext(ProblemContext);
    const {
      error,
      errResponse,
      message: userMessage,
      me: loggedInUser
    } = state;
    const {
      error: Perror,
      errResponse: PerrResp,
      message: problemMessage
    } = useContext(ProblemContext).state;

    useEffect(() => {
      if (Perror) {
        message.error(PerrResp);
        ProblemReset();
      }
    }, [Perror]);

    useEffect(() => {
      if (problemMessage) {
        message.success(problemMessage);
        ProblemReset();
      }
    }, [problemMessage]);

    useEffect(() => {
      if (error) {
        message.error(errResponse);
        UserReset();
      }
    }, [error]);

    useEffect(() => {
      if (userMessage) {
        message.success(userMessage);
        UserReset();
      }
    }, [userMessage]);
    
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar
          role={checkRole()}
          index={index}
          collapsed={collapsed}
          loggedInUserId={loggedInUser ? loggedInUser._id : null}
        />
        <Layout className="site-layout">
          <PageHeader
            history={props.history}
            collapsed={collapsed}
            toggle={handleSetCollapsed}
            name={loggedInUser ? loggedInUser.name : null}
            surname={loggedInUser ? loggedInUser.surname : null}
          />
          <div className="container">
            <Component {...props} />
          </div>
          <PageFooter />
        </Layout>
      </Layout>
    );
  };
}

export default HOC;
