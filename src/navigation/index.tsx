import React from 'react';
import {NativeRouter, Switch, Route} from 'react-router-native';

import * as PATHS from './pathsConst';

import Login from '../pages/Login';
import Main from '../pages/Main';

const MainNavigation = () => {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path={PATHS.main} component={Main} />
        <Route exact path={PATHS.login} component={Login} />
      </Switch>
    </NativeRouter>
  );
};

export default MainNavigation;
