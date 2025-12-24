import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const OutsidePage = () => {
  // const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  // Save data to AsyncStorage
  const saveName = async () => {
    const user = {
      id: 1,
      name: 'John',
      email: 'john@test.com',
    };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      // Comment it to see refresh effect
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

  const fetchUser = useCallback(async () => {
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
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [fetchUser])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUser();
    setRefreshing(false);
  }, [fetchUser]);

  const clearName = async () => {
    try {
      await AsyncStorage.clear();
      setCurrentUser({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ padding: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#6200ee']}
          tintColor="#6200ee"
        />
      }
    >
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
    </ScrollView>
  );
};

export default OutsidePage;
