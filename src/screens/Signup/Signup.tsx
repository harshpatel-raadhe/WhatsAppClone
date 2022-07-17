import React, {useState} from 'react';
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
import {Images} from '../../../assets/Images';
import {colors} from '../../Theme';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {RegExp} from '../../constants/Regex';
import ValidationError from '../../components/ValidationError';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileURL, setProfileURL] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
    }).then((res: any) => {
      setProfileImage(res?.assets[0]?.uri);
      if (res?.assets[0]?.uri) {
        const uploadTask = storage()
          .ref()
          .child(`/profileImage/${Date.now()}`)
          .putFile(res?.assets[0]?.uri);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            Alert.alert(error.message);
          },
          () => {
            uploadTask.snapshot?.ref.getDownloadURL().then(url => {
              setProfileURL(url);
            });
          },
        );
      }
    });
  };

  const SignupHandler = () => {
    console.log('first', profileURL);
    // setLoading(true);
    // if (name.length === 0) {
    //   setNameError('Cannot be blank');
    // } else if (RegExp.nameRegex.test(name) === false) {
    //   setNameError('Please enter a valid First Name.');
    // } else if (name.length > 20) {
    //   setNameError(
    //     `You’ve exceed the amount of characters (${name.length}/20).`,
    //   );
    // }

    // if (mobile.length === 0) {
    //   setMobileError('Cannot be blank');
    // } else if (mobile.length < 10 || mobile.length > 14) {
    //   setMobileError('Please enter a valid phone number.');
    // } else if (RegExp.MobileNoRegex.test(mobile) === false) {
    //   setMobileError('Please enter a valid phone number.');
    // }

    // if (password.length === 0) {
    //   setPasswordError('Cannot be blank');
    // } else if (password.length < 8) {
    //   setPasswordError('Must be at least 8 characters');
    // } else if (RegExp.PasswordRegex.test(password) === false) {
    //   setPasswordError(
    //     'Password contains at least one digit and one speacial character',
    //   );
    // }

    // if (email.length === 0) {
    //   setEmailError('Cannot be blank');
    // } else if (RegExp.EmailRegex.test(email) === false) {
    //   setEmailError('Please enter a valid email address.');
    // }

    // if (profileImage.length === 0) {
    //   Alert.alert('Please upload profile image.');
    // }
    // if (
    //   name.length != 0 &&
    //   mobile.length != 0 &&
    //   email.length != 0 &&
    //   password.length != 0 &&
    //   RegExp.nameRegex.test(name) === true &&
    //   mobile.length >= 10 &&
    //   mobile.length <= 14 &&
    //   RegExp.MobileNoRegex.test(mobile) === true &&
    //   password.length >= 8 &&
    //   RegExp.EmailRegex.test(email) === true &&
    //   RegExp.PasswordRegex.test(password) === true &&
    //   name.length < 21 &&
    //   profileImage.length !== 0
    // ) {
    //   auth()
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(res => {
    //       firestore().collection('users').doc(res.user.uid).set({
    //         name: name,
    //         email: res.user.email,
    //         mobile: mobile,
    //         profileImage: profileURL,
    //       });
    //       Alert.alert('User Registered succesfully.');
    //     })
    //     .catch(err => {
    //       Alert.alert(err.message);
    //     });
    // }
    setLoading(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          {profileImage.length > 0 ? (
            <Image
              source={{uri: profileImage}}
              style={{
                height: 120,
                width: 120,
                borderRadius: 60,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Images.userPlaceholder}
              style={{
                height: 120,
                width: 120,
              }}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={{flex: 1}}>
          <View>
            <TextInput
              placeholder="Name"
              style={{
                borderColor: colors.grey,
                borderWidth: 2,
                borderRadius: 8,
                marginHorizontal: 16,
                paddingLeft: 16,
                marginTop: 20,
              }}
              value={name}
              onChangeText={val => {
                setName(val);
                setNameError('');
              }}
            />
            {nameError ? <ValidationError errorText={nameError} /> : null}
          </View>
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
          <View>
            <TextInput
              placeholder="Phone Number"
              style={{
                borderColor: colors.grey,
                borderWidth: 2,
                borderRadius: 8,
                marginHorizontal: 16,
                paddingLeft: 16,
                marginTop: 20,
              }}
              value={mobile}
              keyboardType="number-pad"
              onChangeText={val => {
                setMobile(val);
                setMobileError('');
              }}
            />
            {mobileError ? <ValidationError errorText={mobileError} /> : null}
          </View>
        </View>
        <TouchableOpacity
          onPress={pickImage}
          style={[
            {
              height: 50,
              backgroundColor: colors.Green,
              marginHorizontal: 16,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
              borderRadius: 8,
              borderColor: colors.white,
              borderWidth: 2,
            },
          ]}>
          <Text style={{fontSize: 20, color: colors.white}}>
            Select Profile Picture
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={SignupHandler}
          style={{
            height: 50,
            backgroundColor: colors.Green,
            marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            borderRadius: 8,
            borderColor: colors.white,
            borderWidth: 2,
          }}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={{fontSize: 20, color: colors.white}}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});