import React from 'react';
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../../src/components/drawer/CustomDrawer';

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
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
      {/* <Drawer.Screen
        name="support"
        options={{ headerShown: true }}
      ></Drawer.Screen> */}
    </Drawer>
  );
};

export default DrawerLayout;
