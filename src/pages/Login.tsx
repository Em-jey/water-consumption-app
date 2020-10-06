import React, {useState, createRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import {RouteComponentProps} from 'react-router-native';
import auth from '@react-native-firebase/auth';

import Input from '../components/Input';
import Button from '../components/Button';

import {main as mainPath} from '../navigation/pathsConst';

type Props = {} & RouteComponentProps;

const Login: React.FC<Props> = (props) => {
  const dim = useWindowDimensions();
  const passRef = createRef<any>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    if (!email || !password) {
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('user: ', user);
        props.history.push(mainPath);
      })
      .catch((err) => {
        console.log('error login: ', err);
        setEmail('');
        setPassword('');
        ToastAndroid.showWithGravity(
          'Wrong Email or Password',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Input
          value={email}
          label="Email"
          onChangeText={(value) => setEmail(value)}
          placeholder="Email"
          returnKeyType="next"
          onSubmitEditing={() => passRef.current.focus()}
          keyboardType="email-address"
        />
        <Input
          ref={passRef}
          value={password}
          label="Password"
          onChangeText={(value) => setPassword(value)}
          placeholder="Password"
          secureTextEntry
          returnKeyType="go"
          onSubmitEditing={login}
        />
      </View>
      <Button
        label="Login"
        onClick={login}
        disabled={!email || !password}
        buttonStyle={{...styles.button, left: dim.width * 0.2 + 15}}
      />
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    width: '60%',
  },
});
