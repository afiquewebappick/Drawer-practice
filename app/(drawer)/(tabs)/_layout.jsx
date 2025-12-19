import React from 'react';
import { Tabs } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton></DrawerToggleButton>,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', headerShown: true }}
      ></Tabs.Screen>
      <Tabs.Screen name="profile" options={{ title: 'Profile' }}></Tabs.Screen>
      <Tabs.Screen
        name="feed"
        options={{ title: 'Feed', headerShown: false }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabLayout;
