import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Theme';
import {Images} from '../../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {RegExp} from '../../constants/Regex';
import ValidationError from '../../components/ValidationError';
import auth from '@react-native-firebase/auth';
import {styles} from './styles';

export const Login = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const LoginHandler = () => {
    setLoading(true);

    if (password.length === 0) {
      setPasswordError('Cannot be blank');
    } else if (password.length < 8) {
      setPasswordError('Must be at least 8 characters');
    } else if (RegExp.PasswordRegex.test(password) === false) {
      setPasswordError(
        'Password contains at least one digit and one speacial character',
      );
    }

    if (email.length === 0) {
      setEmailError('Cannot be blank');
    } else if (RegExp.EmailRegex.test(email) === false) {
      setEmailError('Please enter a valid email address.');
    }

    if (
      email.length != 0 &&
      password.length != 0 &&
      password.length >= 8 &&
      RegExp.EmailRegex.test(email) === true &&
      RegExp.PasswordRegex.test(password) === true
    ) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {})
        .catch(err => {
          Alert.alert(err.message);
        });
    }
    setLoading(false);
  };

  return (
    <View style={styles.flex}>
      <View style={styles.flex}>
        <View style={styles.imageWrapper}>
          <Image
            source={Images.Logo}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.welcome}>Welcome to WhatsApp</Text>
        </View>
        <View style={styles.imageWrapper}>
          <View>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={val => {
                setEmail(val);
                setEmailError('');
              }}
            />
            {emailError ? <ValidationError errorText={emailError} /> : null}
          </View>
          <View>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={val => {
                setPassword(val);
                setPasswordError('');
              }}
            />
            {passwordError ? (
              <ValidationError errorText={passwordError} />
            ) : null}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={LoginHandler} style={styles.buttton}>
        {loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <Text style={styles.login}>Login</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.text2}>
        Don't have an account?{' '}
        <Text
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={styles.signup}>
          Signup
        </Text>
      </Text>
    </View>
  );
};
