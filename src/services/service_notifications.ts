const PushNotification = require('react-native-push-notification');
import {hour, now} from '../utils/time';
import {increaseTodayValue} from './service_firebase_db';

const notificationInverval = hour * 2;

class NotificationManagerClass {
  constructor() {
    PushNotification.configure({
      onRegister: function (token: any) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification: any) {
        // console.log('NOTIFICATION:', notification);
        if (notification.action && notification.action === 'ok') {
          increaseTodayValue();
        }
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
      date: new Date(now() + notificationInverval),
      actions: ['nope', 'ok'],
      repeatType: 'time',
      repeatTime: notificationInverval,
    });
    return id;
  }

  cancelNotification() {
    // PushNotification.cancelLocalNotifications({id: `${id}`});
    PushNotification.cancelAllLocalNotifications();
  }

  async checkNotifications(callback: (arg: any) => void) {
    PushNotification.getScheduledLocalNotifications(callback);
  }
}

const NotificationManager = new NotificationManagerClass();

export default NotificationManager;
