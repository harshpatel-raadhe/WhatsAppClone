import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../Theme';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/storage';

const Home = () => {
  const [users, setUsers]: any = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const querySnap = await firestore().collection('users').get();
    const allUsers = querySnap.docs.map(item => item.data());
    setUsers(allUsers);
  };

  console.log(users);

  return (
    <View>
      <Text>Home</Text>
      {users &&
        users.map(item => {
          return <View>{/* <Image source={{uri: i}} /> */}</View>;
        })}
      <TouchableOpacity
        onPress={() => {
          auth().signOut();
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.Green,
          margin: 16,
          borderRadius: 16,
          padding: 16,
        }}>
        <Text style={{color: colors.white, fontSize: 20}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
