import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Chat from '../screens/Chat/Chat';
import {Friends} from '../screens/Friends';
import Home from '../screens/Home/Home';
import {Login} from '../screens/Login';
import {Signup} from '../screens/Signup';
import {Users} from '../screens/Users';

export const RootNavigator = () => {
  const Stack = createStackNavigator();
  const [user, setUser]: any = useState('');

  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser('');
      }
    });

    return () => {
      unregister();
    };
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name="Home" children={() => <Home user={user} />} />
          <Stack.Screen
            name="Friends"
            children={() => <Friends user={user} />}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Users" component={Users} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
