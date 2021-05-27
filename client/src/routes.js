import React from 'react';
import { Route, Switch } from 'react-router-dom';
import checkAuth, { checkRole } from './helpers/checkAuth';

import Home from './components/Home';
import Dashboard from './components/panel/Dashboard/Dashboard';

import UserList from './components/panel/Lists/UserList';
import SingleUser from './components/panel/SinglePages/SingleUser';
import AddNewUser from './components/panel/AddNew/AddNewUser';

import ExpertList from './components/panel/Lists/ExpertList';
import SingleExpert from './components/panel/SinglePages/SingleExpert';

import ProblemList from './components/panel/Lists/ProblemList';
import SingleProblem from './components/panel/SinglePages/SingleProblem';
import AddNewProblem from './components/panel/AddNew/AddNewProblem';
import AnalystPOV from './components/panel/ProblemPOVS/AnalystPOV';
import ExpertPOV from './components/panel/ProblemPOVS/ExpertPOV';
import Results from './components/panel/ProblemPOVS/Solve/Results';
import Solving from './components/panel/ProblemPOVS/Solve/Solving';

import LoginForm from './components/auth/Login';
import RegForm from './components/auth/Register';

import MissingPage from './components/errors/404';
import ForbiddenPage from './components/errors/403';

export const AnalystIsland = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkRole() === 'analyst' ? (
        <Component {...props} />
      ) : (
        window.location.replace('/403')
      )
    }
  />
);

export const ExpertIsland = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkRole() === 'expert' ? (
        <Component {...props} />
      ) : (
        window.location.replace('/403')
      )
    }
  />
);

export const AdminIsland = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkRole() === 'admin' ? (
        <Component {...props} />
      ) : (
        window.location.replace('/403')
      )
    }
  />
);

export const OnlyMeOrBB = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkRole() === 'admin' || checkAuth() === props.match.params.id ? (
        <Component {...props} />
      ) : (
        window.location.replace('/403')
      )
    }
  />
);

export const LoginIsland = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        window.location.replace('/user/login')
      )
    }
  />
);

const BaseRoute = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/user/reg" component={RegForm} />
    <Route exact path="/user/login" component={LoginForm} />

    <LoginIsland exact path="/home" component={Dashboard} />
    <LoginIsland exact path="/problems" component={ProblemList} />
    <LoginIsland exact path="/problem/result/:id" component={Results} />
    
    <OnlyMeOrBB exact path="/user/:id" component={SingleUser} />

    <AdminIsland exact path="/users" component={UserList} />
    <AdminIsland exact path="/add-new-user" component={AddNewUser} />

    <AnalystIsland exact path="/add-new-problem" component={AddNewProblem} />
    <AnalystIsland exact path="/problem/:id" component={SingleProblem} />
    <AnalystIsland exact path="/analyst/problem/:id" component={AnalystPOV} />
    <AnalystIsland exact path="/experts" component={ExpertList} />
    <AnalystIsland exact path="/expert/:id" component={SingleExpert} />

    <ExpertIsland exact path="/expert/problem/:id" component={ExpertPOV} />
    <ExpertIsland exact path="/problem/solving/:id/:method" component={Solving} />

    <Route exact path="/403" component={ForbiddenPage} />
    <Route component={MissingPage} />
  </Switch>
);

export default BaseRoute;
