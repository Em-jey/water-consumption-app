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
  setStartCount,
  subscribeNotifyID,
  setNotifyID,
} from '../services/service_firebase_db';

type Props = {} & RouteComponentProps;

const Main: React.FC<Props> = (props) => {
  const [notificationID, setNotificationID] = useState<number | null>(null);
  const [subToValue, setSubToValue] = useState<any>(null);
  const [subToNotify, setSubToNotify] = useState<any>(null);
  const [drankGlasses, setDrankGlasses] = useState<number>(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dim = Dimensions.get('window');

  const user = auth().currentUser;
  if (!user) {
    return <Redirect to={loginPath} />;
  }

  useEffect(() => {
    setStartCount();
    checkNotify();
    const subValue = subscribeTodayValue(dbValueChange);
    setSubToValue(subValue);
    const subNotifyID = subscribeNotifyID(dbNotifyChange);
    setSubToNotify(subNotifyID);
    return () => {
      if (subToValue) {
        subToValue.off();
      }
      if (subToNotify) {
        subToNotify.off();
      }
    };
  }, []);

  const dbValueChange = (value: number) => {
    if (!progressAnim) {
      return;
    }
    if (value > 12) {
      value = 12;
    }
    setDrankGlasses(value);
    const toValue = (dim.width - 30) * (value / 12);
    Animated.timing(progressAnim, {
      toValue,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const dbNotifyChange = (value: number | null) => {
    setNotificationID(value);
  };

  const setNotification = () => {
    const notifyId = NotificationManager.sendNotification(
      'Stay hydrated',
      'Hey, Drink a glass of water',
    );
    setNotifyID(notifyId);
  };

  const cancelNotify = () => {
    NotificationManager.cancelNotification();
    setNotifyID(null);
  };

  const logoff = () => {
    auth().signOut();
    cancelNotify();
    props.history.push(loginPath);
  };

  const checkNotify = () => {
    NotificationManager.checkNotifications((notifyList: any) => {
      const notifyID = notifyList.length ? notifyList[0].id : null;
      setNotifyID(notifyID);
      if (!notifyID) {
        setNotification();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        You have drank {drankGlasses} glasses of water today
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
      <View style={styles.devContainer}>
        <Text>dev box</Text>
        <View style={styles.devButons}>
          <Button
            onPress={() => {
              cancelNotify();
              setNotification();
            }}
            title="Notify"
          />
          <Button
            onPress={cancelNotify}
            title={`Cancel notify id: ${notificationID}`}
          />
        </View>
      </View>
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
    marginBottom: 30,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 32,
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
  devContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: '100%',
  },
  devButons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
