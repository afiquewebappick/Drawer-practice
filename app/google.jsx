import { View } from 'react-native'
import { WebView } from 'react-native-webview'

export default function GoogleScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://www.google.com' }} />
    </View>
  )
}
