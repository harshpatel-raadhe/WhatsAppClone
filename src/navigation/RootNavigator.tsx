import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens/Login';
import {Signup} from '../screens/Signup';
import Home from '../screens/Home/Home';
import auth from '@react-native-firebase/auth';

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
        <Stack.Screen name="Home" component={Home} />
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
