import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

const Home = ({user}: any) => {
  const navigation: any = useNavigation();
  const [users, setUsers]: any = useState([]);
  const [owner, setOwner]: any = useState([]);

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
    <View style={styles.main}>
      <Text style={styles.nameText}>Hello, {owner[0]?.name}</Text>
      <View style={styles.main}>
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
                  style={styles.userWrapper}>
                  <Image
                    source={{uri: item?.profileImage}}
                    style={styles.image}
                  />
                  <View style={styles.nameWrapper}>
                    <Text style={styles.name2}>{item.name}</Text>
                    <Text style={styles.name2}>{item.email}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.line} />
              </>
            );
          })}
      </View>
      <TouchableOpacity
        onPress={() => {
          auth().signOut();
        }}
        style={styles.button}>
        <Text style={styles.logout}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
