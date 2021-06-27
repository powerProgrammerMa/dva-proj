import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import userPage from './routes/userPage';
import useModelPage from './routes/useModelPage';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/user" component={userPage} />
        <Route path="/usemodel" component={useModelPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
