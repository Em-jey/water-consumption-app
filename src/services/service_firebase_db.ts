import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {dateFormat} from '../utils/time';

export const setStartCount = () => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/${dateFormat()}`;
  database()
    .ref(refPath)
    .once('value', (snap) => {
      if (!snap.exists()) {
        database().ref(refPath).set(0);
      }
    });
};

export const subscribeTodayValue = (callback: (arg: number) => void) => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/${dateFormat()}`;
  const ref = database().ref(refPath);
  ref.on('value', (snap: any) => {
    const value = snap?.val();
    if (value || value === 0) {
      callback(value);
    }
  });
  return ref;
};

export const increaseTodayValue = () => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/${dateFormat()}`;
  const ref = database().ref(refPath);
  ref.once('value', (snap: any) => {
    const value = snap.val();
    ref.set(value + 1);
  });
};

export const setNotifyID = (notifyId: number | null) => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/notifyID`;
  database().ref(refPath).set(notifyId);
};

export const subscribeNotifyID = (callback: (arg: number) => void) => {
  const userID = auth().currentUser?.uid;
  if (!userID) {
    return;
  }
  const refPath = `/users/${userID}/notifyID`;
  database()
    .ref(refPath)
    .on('value', (snap: any) => {
      const value = snap?.val();
      callback(value);
    });
};
