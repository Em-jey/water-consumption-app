import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-native';
import auth from '@react-native-firebase/auth';

import * as PATHS from './pathsConst';

type Props = {} & RouteProps;

const protectedRoute: React.FC<Props> = ({component: Component, ...rest}) => {
  const user = auth().currentUser;
  return (
    <Route
      {...rest}
      render={(props: RouteProps) =>
        !user ? <Redirect to={PATHS.login} /> : <Component {...props} />
      }
    />
  );
};

export default protectedRoute;
