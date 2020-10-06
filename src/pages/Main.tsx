import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Redirect, RouteComponentProps} from 'react-router-native';
import auth from '@react-native-firebase/auth';

import {login as loginPath} from '../navigation/pathsConst';

type Props = {} & RouteComponentProps;

const Main: React.FC<Props> = () => {
  const user = auth().currentUser;
  if (!user) {
    return <Redirect to={loginPath} />;
  }
  return (
    <View style={styles.container}>
      <Text>Main Page</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
