import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
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
  );
}
