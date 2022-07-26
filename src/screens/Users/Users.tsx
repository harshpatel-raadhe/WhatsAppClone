import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../Theme';
import {firebase} from '@react-native-firebase/auth';

export const Users = () => {
  const user: any = firebase.auth().currentUser;

  const [users, setUsers]: any = useState([]);
  const [owner, setOwner]: any = useState([]);
  const [friends, setFriends]: any = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const querySnap = await firestore()
      .collection('users')
      .where('email', '!=', user.email)
      .get();
    const allUsers = querySnap.docs.map(item => item.data());

    const querySnap2 = await firestore()
      .collection('users')
      .where('email', '==', user.email)
      .get();
    const allUsers2 = querySnap2.docs.map(item => item.data());

    let friends = allUsers.filter(
      item => !allUsers2[0].friendList.includes(item.uid) && item,
    );

    setOwner(allUsers2);
    setUsers(friends);
  };

  const addFriend = (item: any) => {
    setFriends([...friends, item.uid]);
    let addUsers = [...friends, ...owner[0]?.friendList, item.uid];
    let restUsers = users.filter((val: any) => val.uid !== item.uid && val);
    setUsers(restUsers);
    firestore().collection('users').doc(user.uid).set({
      name: owner[0]?.name,
      email: owner[0]?.email,
      mobile: owner[0]?.mobile,
      profileImage: owner[0]?.profileImage,
      uid: owner[0]?.uid,
      friendList: addUsers,
    });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.nameText}>All Users</Text>
      <View style={styles.main}>
        <FlatList
          data={users}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <>
                <View style={styles.userWrapper}>
                  <Image
                    source={{uri: item?.profileImage}}
                    style={styles.image}
                  />
                  <View style={styles.nameWrapper}>
                    <Text style={styles.name2}>{item.name}</Text>
                    <Text style={styles.name2}>{item.email}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      addFriend(item);
                    }}
                    style={styles.addFriend}>
                    <Text style={styles.addFriendText}>Add Friend +</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.line} />
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1},
  addFriend: {backgroundColor: colors.Green, padding: 4},
  addFriendText: {color: colors.white},
  nameText: {
    padding: 16,
    fontSize: 20,
    backgroundColor: colors.Green,
    color: colors.white,
    fontWeight: '600',
  },
  userWrapper: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  image: {height: 50, width: 50, borderRadius: 25},
  nameWrapper: {flex: 1, marginLeft: 16},
  name2: {fontSize: 18, color: colors.black},
  line: {height: 1, backgroundColor: colors.grey},
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Green,
    margin: 8,
    borderRadius: 8,
    padding: 8,
  },
  logout: {color: colors.white, fontSize: 20},
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Green,
    margin: 8,
    borderRadius: 8,
    padding: 8,
  },
});
