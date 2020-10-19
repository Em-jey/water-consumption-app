import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {dateFormat} from '../utils/time';

export const setTodayCount = () => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/${dateFormat()}`;
  database()
    .ref(refPath)
    .once('value', (snap) => {
      if (!snap.exists()) {
        console.log('set new value');
        database().ref(refPath).set({
          glasses: 0,
          notifyID: 0,
        });
      }
    });
};

export const subscribeTodayValue = (callback: (arg: any) => void) => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/${dateFormat()}/glasses`;
  const ref = database().ref(refPath);
  ref.on('value', (snap: any) => {
    // console.log('subscribeTodayValue": ', snap.val());
    const value = snap?.val();
    if (value || value === 0) {
      callback(value);
    }
  });
  return ref;
};

export const setTodayNotifyId = (notifyId: number) => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/${dateFormat()}/notifyID`;
  database().ref(refPath).set(notifyId);
};
