const PushNotification = require('react-native-push-notification');
// import PushNotification from 'react-native-push-notification';
import {minute, hour, now, second} from '../utils/time';
class NotificationManagerClass {
  constructor() {
    PushNotification.configure({
      onRegister: function (token: any) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err: any) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: false,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  sendNotification(title: string, message: string, id: number | null = null) {
    console.log('sendNotification');
    if (!id) {
      id = Math.floor(now().valueOf() / 5000);
    }
    PushNotification.localNotificationSchedule({
      id: id,
      title,
      message,
      autoCancel: true,
      vibrate: true,
      vibration: 300,
      date: new Date(now() + 10 * second),
      // actions: ['nope', 'ok'],
      // repeatType: 'time',
      // repeatTime: minute * 2,
    });
    return id;
  }

  cancelNotification(id: number) {
    PushNotification.cancelLocalNotifications({id: `${id}`});
  }

  checkNotifications() {
    PushNotification.getScheduledLocalNotifications((list: any) => {
      console.log('got notifies jet to show: ', list);
    });
  }
}

const NotificationManager = new NotificationManagerClass();

export default NotificationManager;
