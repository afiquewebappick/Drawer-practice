import { View, Text } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }}></Stack.Screen>
      <View>
        <Text>Index</Text>
        <Link href={'/outside'}>
          <Text>Outside</Text>
        </Link>
      </View>
    </>
  );
};

export default Index;
