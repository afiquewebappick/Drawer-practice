import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CustomDrawer(props) {
  const router = useRouter();

  const DrawerItem = ({ icon, label, route }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(route);
        props.navigation.closeDrawer();
      }}
      className="flex-row items-center gap-4 px-5 py-4 rounded-xl"
    >
      {icon}
      <Text className="text-base font-medium">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props}>
      {/* Profile */}
      <View className="px-5 pt-6 pb-8 flex-row items-center gap-4">
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          className="w-14 h-14 rounded-full"
        />
        <View>
          <Text className="text-lg font-semibold">Sunie Pham</Text>
          <Text className="text-gray-500 text-sm">sunieux@gmail.com</Text>
        </View>
      </View>

      {/* Main */}
      <View className="px-3">
        <DrawerItem
          label="Homepage"
          route="/(tabs)/index"
          icon={<Ionicons name="home-outline" size={22} />}
        />

        <DrawerItem
          label="Discover"
          route="/(tabs)/index/discover"
          icon={<Ionicons name="search-outline" size={22} />}
        />

        <DrawerItem
          label="My Order"
          route="/(tabs)/index/orders"
          icon={<Feather name="shopping-bag" size={22} />}
        />

        <DrawerItem
          label="My Profile"
          route="/(tabs)/index/profile"
          icon={<Ionicons name="person-outline" size={22} />}
        />

        <Text className="mt-8 mb-3 px-5 text-gray-400 text-xs">OTHER</Text>

        <DrawerItem
          label="Setting"
          route="/(tabs)/index/settings"
          icon={<Ionicons name="settings-outline" size={22} />}
        />

        <DrawerItem
          label="Support"
          route="/support"
          icon={<Ionicons name="mail-outline" size={22} />}
        />

        <DrawerItem
          label="About us"
          route="/about"
          icon={<Ionicons name="information-circle-outline" size={22} />}
        />
      </View>

      {/* Theme Switch */}
      <View className="mt-10 px-5 flex-row bg-gray-100 rounded-full mx-5 p-2">
        <TouchableOpacity className="flex-1 items-center py-2 bg-white rounded-full">
          <Ionicons name="sunny-outline" size={18} />
          <Text>Light</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 items-center py-2">
          <Ionicons name="moon-outline" size={18} />
          <Text>Dark</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
