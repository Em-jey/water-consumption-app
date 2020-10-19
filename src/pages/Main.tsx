import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Redirect, RouteComponentProps} from 'react-router-native';
import auth from '@react-native-firebase/auth';

import {login as loginPath} from '../navigation/pathsConst';
import NotificationManager from '../services/service_notifications';

type Props = {} & RouteComponentProps;

const testNotify = () => {
  console.log('push notify');
  NotificationManager.sendNotification(
    'Hello There',
    'Hey, Drink a glass of water',
  );
  console.log('push notify end');
};

const Main: React.FC<Props> = () => {
  const user = auth().currentUser;
  if (!user) {
    return <Redirect to={loginPath} />;
  }
  // testNotify();
  return (
    <View style={styles.container}>
      <Text>Main Page</Text>
      <Button onPress={testNotify} title="hey" />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
