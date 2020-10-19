/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {Redirect, RouteComponentProps} from 'react-router-native';
import auth from '@react-native-firebase/auth';

import {login as loginPath} from '../navigation/pathsConst';
import NotificationManager from '../services/service_notifications';
import {
  subscribeTodayValue,
  setTodayCount,
} from '../services/service_firebase_db';

type Props = {} & RouteComponentProps;

const Main: React.FC<Props> = (props) => {
  const [notificationID, setNotificationID] = useState<number | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dim = Dimensions.get('window');

  const user = auth().currentUser;
  if (!user) {
    return <Redirect to={loginPath} />;
  }

  useEffect(() => {
    console.log('mounted');
    setTodayCount();
    const sub = subscribeTodayValue(dbValueChange);
    setSubscription(sub);
    return () => {
      subscription.off();
    };
  }, []);

  const dbValueChange = (value: number) => {
    if (!progressAnim) {
      return;
    }
    if (value > 12) {
      value = 12;
    }
    const toValue = (dim.width - 30) * (value / 12);
    // console.log('dbValueChange value: ', value);
    // console.log('dbValueChange toValue: ', toValue);
    Animated.timing(progressAnim, {
      toValue,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const testNotify = () => {
    const notifyId = NotificationManager.sendNotification(
      'Stay hydrated',
      'Hey, Drink a glass of water',
    );
    setNotificationID(notifyId);
  };

  const cancelNotify = () => {
    if (!notificationID) {
      return;
    }
    NotificationManager.cancelNotification(notificationID);
    setNotificationID(null);
  };

  const logoff = () => {
    auth().signOut();
    props.history.push(loginPath);
  };

  return (
    <View style={styles.container}>
      <Text>Main Page</Text>
      <View style={styles.notifyButton}>
        <Button onPress={testNotify} title="hey" />
      </View>
      <Button
        onPress={cancelNotify}
        title={`cancel notify id: ${notificationID}`}
      />
      <Text style={styles.infoText}>
        You have drank x glasses of water today
      </Text>
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim,
            },
          ]}
        />
      </View>
      <Button onPress={logoff} title="logoff" />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  notifyButton: {
    marginVertical: 30,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 28,
  },
  progressContainer: {
    width: '100%',
    height: 30,
    borderColor: '#1d1d1d',
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 30,
  },
  progressBar: {
    backgroundColor: '#007bff',
    height: 28,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
