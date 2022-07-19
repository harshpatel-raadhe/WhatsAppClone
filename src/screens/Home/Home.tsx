import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../Theme';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';

const Home = ({user}: any) => {
  const navigation: any = useNavigation();
  const [users, setUsers]: any = useState([]);
  const [owner, setOwner]: any = useState([]);
  console.log('🚀 ~ file: Home.tsx ~ line 13 ~ Home ~ owner', owner);

  useEffect(() => {
    getAllUsers();
    getOwnerData();
  }, []);

  const getAllUsers = async () => {
    const querySnap = await firestore()
      .collection('users')
      .where('email', '!=', user.email)
      .get();
    const allUsers = querySnap.docs.map(item => item.data());
    setUsers(allUsers);
  };

  const getOwnerData = async () => {
    const querySnap = await firestore()
      .collection('users')
      .where('email', '==', user.email)
      .get();
    const allUsers = querySnap.docs.map(item => item.data());
    setOwner(allUsers);
  };

  return (
    <View>
      <Text
        style={{
          padding: 16,
          fontSize: 20,
          backgroundColor: colors.Green,
          color: colors.white,
          fontWeight: '600',
        }}>
        Hello, {owner[0]?.name}
      </Text>
      {users &&
        users.map((item: any) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat', {
                    user: item,
                    owner: owner,
                  });
                }}
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  backgroundColor: colors.white,
                }}>
                <Image
                  source={{uri: item?.profileImage}}
                  style={{height: 50, width: 50, borderRadius: 25}}
                />
                <View style={{marginLeft: 16}}>
                  <Text style={{fontSize: 18, color: colors.black}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 18, color: colors.black}}>
                    {item.email}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: colors.grey}} />
            </>
          );
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
