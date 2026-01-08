import React from 'react';
import { Tabs } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Badge, Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const TabLayout = () => {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon src={<VectorIcon family={AntDesign} name="profile" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="feed">
        <Label>Feed</Label>
        <Badge>9+</Badge>
        <Icon src={<VectorIcon family={MaterialIcons} name="feed" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role='search'>
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
  // return (
  //   <Tabs
  //     screenOptions={{
  //       headerLeft: () => <DrawerToggleButton></DrawerToggleButton>,
  //     }}
  //   >
  //     <Tabs.Screen
  //       name="index"
  //       options={{ title: 'Home', headerShown: true }}
  //     ></Tabs.Screen>
  //     <Tabs.Screen name="profile" options={{ title: 'Profile' }}></Tabs.Screen>
  //     <Tabs.Screen
  //       name="feed"
  //       options={{ title: 'Feed', headerShown: false }}
  //     ></Tabs.Screen>
  //   </Tabs>
  // );
};

export default TabLayout;
