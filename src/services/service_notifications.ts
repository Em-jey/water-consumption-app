const PushNotification = require('react-native-push-notification');

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

  sendNotification(title: string, message: string) {
    console.log('sendNotification');
    PushNotification.localNotification({
      title,
      message,
      autoCancel: true,
      vibrate: true,
      vibration: 300,
      actions: ['nope', 'ok'],
    });
    // id: 123,
    // title: 'Hello there',
    // message: 'Hey, drink a glass of water',
    // repeatType: 'hour',
    // repeatTime: 2,
    // invokeApp: true,
    // actions: "['Nope', 'Sure']",
  }
}

const NotificationManager = new NotificationManagerClass();

export default NotificationManager;
