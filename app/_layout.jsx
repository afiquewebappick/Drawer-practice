import { Stack } from 'expo-router';
import '../global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="chat-modal"
        options={{ headerShown: false, presentation: 'formSheet' }}
      ></Stack.Screen>
    </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
