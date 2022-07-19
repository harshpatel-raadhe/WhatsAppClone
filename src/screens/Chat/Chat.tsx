import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

const Chat = () => {
  const route: any = useRoute();
  //   console.log('🚀 ~ file: Chat.tsx ~ line 9 ~ Chat ~ route', route);
  const [messages, setMessages]: any = useState([]);

  const getAllMsg = async () => {
    const docId =
      route.params.owner[0]?.uid > route.params.user.uid
        ? route.params.user.uid + '-' + route.params.owner[0]?.uid
        : route.params.owner[0]?.uid + '-' + route.params.user.uid;

    const querySnap = await firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();

    const allMsg = querySnap.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });
    setMessages(allMsg);
  };

  useEffect(() => {
    getAllMsg();

    const docId =
      route.params.owner[0]?.uid > route.params.user.uid
        ? route.params.user.uid + '-' + route.params.owner[0]?.uid
        : route.params.owner[0]?.uid + '-' + route.params.user.uid;

    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    messageRef.onSnapshot(querySnap => {
      const allMsg = querySnap.docs.map(docSnap => {
        const data = docSnap.data();
        if (data.createdAt) {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSnap.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allMsg);
    });
  }, []);

  const onSend = (messages: any) => {
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sentby: route.params.owner[0]?.uid,
      sentTo: route.params.user.uid,
    };
    console.log(mymsg);
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
    const docId =
      route.params.owner[0]?.uid > route.params.user.uid
        ? route.params.user.uid + '-' + route.params.owner[0]?.uid
        : route.params.owner[0]?.uid + '-' + route.params.user.uid;
    firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.owner[0]?.uid,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
