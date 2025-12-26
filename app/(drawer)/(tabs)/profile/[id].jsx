import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function Profile() {
  const { id } = useLocalSearchParams()

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>
        Profile Screen
      </Text>

      <Text>User ID: {id}</Text>
    </View>
  )
}
