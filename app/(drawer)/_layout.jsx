import React from 'react';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        drawerType: 'front',
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#003CB3',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, title: 'Home' }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="support"
        options={{ headerShown: true }}
      ></Drawer.Screen>
    </Drawer>
  );
};

export default DrawerLayout;
