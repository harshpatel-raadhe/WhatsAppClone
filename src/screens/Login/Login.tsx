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
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Image
            source={Images.Logo}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
          <Text style={{fontSize: 22, color: colors.Green, marginTop: 20}}>
            Welcome to WhatsApp
          </Text>
        </View>
        <View style={{marginTop: 50}}>
          <View>
            <TextInput
              placeholder="Email"
              style={{
                borderColor: colors.grey,
                borderWidth: 2,
                borderRadius: 8,
                marginHorizontal: 16,
                paddingLeft: 16,
                marginTop: 20,
              }}
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
              style={{
                borderColor: colors.grey,
                borderWidth: 2,
                borderRadius: 8,
                marginHorizontal: 16,
                paddingLeft: 16,
                marginTop: 20,
              }}
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
      <TouchableOpacity
        onPress={LoginHandler}
        style={{
          height: 50,
          backgroundColor: colors.Green,
          marginHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
          borderRadius: 8,
          borderColor: colors.white,
          borderWidth: 2,
        }}>
        {loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <Text style={{fontSize: 20, color: colors.white}}>Login</Text>
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          color: colors.black,
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Don't have an account?{' '}
        <Text
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={{fontSize: 16, color: colors.Green}}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
