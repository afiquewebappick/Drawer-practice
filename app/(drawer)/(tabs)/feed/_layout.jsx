import React from 'react';
import { Stack } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Feed',
          headerLeft: () => <DrawerToggleButton></DrawerToggleButton>,
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default Layout;
