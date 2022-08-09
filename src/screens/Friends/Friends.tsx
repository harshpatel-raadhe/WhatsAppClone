import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const Friends = ({user}: any) => {
  const Focus = useIsFocused();
  const navigation: any = useNavigation();
  const [users, setUsers]: any = useState([]);
  const [owner, setOwner]: any = useState([]);

  useEffect(() => {
    getAllUsers();
  }, [Focus]);

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
    const ownerUser = querySnap2.docs.map(item => item.data());

    let a = ownerUser[0].friendList
      .map((item: any) => {
        let a = allUsers
          .map((data: any) => {
            return data.uid === item.id && !item?.isMessaged ? data : null;
          })
          .filter(s => s?.email && s);
        return a[0];
      })
      .filter((user: any) => user?.email && user);

    setOwner(ownerUser);
    setUsers(a);
  };

  return (
    <View style={styles.main}>
      <View style={styles.headerWrapper}>
        <Text style={styles.nameText}>Friends</Text>
      </View>
      <View style={styles.main}>
        {users.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={users}
            renderItem={({item}) => {
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
            }}
          />
        ) : (
          <View style={[styles.main, styles.center]}>
            <Text style={styles.name3}>No Users Found.</Text>
          </View>
        )}
      </View>
    </View>
  );
};
