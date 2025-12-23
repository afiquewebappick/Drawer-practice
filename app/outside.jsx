import { View, Text, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OutsidePage = () => {
  // const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  // Save data to AsyncStorage
  const saveName = async () => {
    const user = {
      id: 1,
      name: 'John',
      email: 'john@test.com',
    };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      Alert.alert('Success', 'Name saved successfully');
    } catch (error) {
      console.log(error);
    }
  };

  // Read data from AsyncStorage
  // const getName = async () => {
  //   try {
  //     const value = JSON.parse(await AsyncStorage.getItem('user'));
  //     if (value) {
  //       setCurrentUser(value)
  //       // setName(value);
  //     } else {
  //       setCurrentUser({})
  //       // setName('');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem('user'));
        if (value) {
          setCurrentUser(value);
          // setName(value);
        } else {
          setCurrentUser({});
          // setName('');
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, []);

  const clearName = async () => {
    try {
      await AsyncStorage.clear();
      setCurrentUser({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>OutsidePage</Text>

      <Text style={{ marginVertical: 10 }}>User Name: {currentUser.name}</Text>
      <Text style={{ marginVertical: 10 }}>
        User Email: {currentUser.email}
      </Text>

      <Button title="Save Name" onPress={saveName} />
      <View style={{ height: 10 }} />
      {/* <Button title="Get Name" onPress={getName} />
      <View style={{ height: 10 }} /> */}
      <Button title="Clear Name" onPress={clearName} />
    </View>
  );
};

export default OutsidePage;
