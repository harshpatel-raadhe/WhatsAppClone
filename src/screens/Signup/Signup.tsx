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
import {styles} from './styles';

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
          async () => {
            await uploadTask.snapshot?.ref.getDownloadURL().then(url => {
              setProfileURL(url);
            });
          },
        );
      }
    });
  };

  const SignupHandler = () => {
    if (name.length === 0) {
      setNameError('Cannot be blank');
    } else if (RegExp.nameRegex.test(name) === false) {
      setNameError('Please enter a valid First Name.');
    } else if (name.length > 20) {
      setNameError(
        `You’ve exceed the amount of characters (${name.length}/20).`,
      );
    }

    if (mobile.length === 0) {
      setMobileError('Cannot be blank');
    } else if (mobile.length < 10 || mobile.length > 14) {
      setMobileError('Please enter a valid phone number.');
    } else if (RegExp.MobileNoRegex.test(mobile) === false) {
      setMobileError('Please enter a valid phone number.');
    }

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

    if (profileImage.length === 0) {
      Alert.alert('Please upload profile image.');
    }
    if (
      name.length != 0 &&
      mobile.length != 0 &&
      email.length != 0 &&
      password.length != 0 &&
      RegExp.nameRegex.test(name) === true &&
      mobile.length >= 10 &&
      mobile.length <= 14 &&
      RegExp.MobileNoRegex.test(mobile) === true &&
      password.length >= 8 &&
      RegExp.EmailRegex.test(email) === true &&
      RegExp.PasswordRegex.test(password) === true &&
      name.length < 21 &&
      profileImage.length !== 0
    ) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          firestore()
            .collection('users')
            .doc(res.user.uid)
            .set({
              name: name,
              email: res.user.email,
              mobile: mobile,
              profileImage: profileURL,
              uid: Math.random() * 10,
            });
          Alert.alert('User Registered succesfully.');
        })
        .catch(err => {
          Alert.alert(err.message);
        });
    }
    setLoading(false);
  };

  return (
    <View style={styles.flex}>
      <View style={styles.flex2}>
        <View style={styles.imageWrapper}>
          {profileImage.length > 0 ? (
            <Image
              source={{uri: profileImage}}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Images.userPlaceholder}
              style={styles.image2}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.flex2}>
          <View>
            <TextInput
              placeholder="Name"
              style={styles.input}
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
              secureTextEntry={true}
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
          <View>
            <TextInput
              placeholder="Phone Number"
              maxLength={10}
              style={styles.input}
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
        <TouchableOpacity onPress={pickImage} style={[styles.selectImage]}>
          <Text style={styles.signup}>Select Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={profileURL.length == 0 ? true : false}
          onPress={() => {
            setLoading(true);
            SignupHandler();
          }}
          style={styles.signupButton}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={styles.signup}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
