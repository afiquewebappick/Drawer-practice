import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import AntDesign from '@expo/vector-icons/AntDesign';

const banglaText =
  'একদা একটা ঘোড়া আর একটা গাধা নিয়ে একটি লোক রাস্তা দিয়ে হেঁটে যাচ্ছিল। গাধাটার পিঠে ছিল মস্ত দু\'টো ভারী বোঝা। সে আর বইতে পারছিল না। গাধা তখন ঘোড়াকে বলল, "ভাই, আমি যে আর পারছি না, আমি যে মারা যেতে বসেছি। আমাকে বাঁচাতে চাও তো এ বোঝার কিছুটা মাল তুমি তোমার পিঠে নাও।" ঘোড়া এ প্রস্তাবে রাজি হল না। একটু পরেই বোঝার ভার সইতে না পেরে গাধাটা পথের মাঝখানে মুখ থুবড়ে পড়ে গিয়ে মারা গেল। লোকটি তখন গাধা যে বোঝা বইছিল তা তো ঘোড়ার পিঠে চাপালোই, উপরন্তু মরা গাধার ছাল ছাড়িয়ে সেটাও ঘোড়ার পিঠে চাপালো। এবার ভারের চোটে ঘোড়া কোঁকাতে কোঁকাতে করুণ সুরে বিলাপ করতে করতে বলতে লাগলো- "আমার দুর্মতির জন্যে আজ এই দশা হল। গাধার বোঝার খানিকটা আমি বইতে রাজি হইনি, তাই এখন তা পুরো বোঝা—এমনকি তার চামড়া পর্যন্তও আমাকে বইতে হচ্ছে।" উপদেশ: অল্প দায়িত্বের ভার এড়িয়ে গেলে অনেক সময় বড় দায়িত্বের বোঝা ঘাড়ে এসে পড়ে।';

// Split text into words while preserving spaces
const words = banglaText.split(' ');

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSpeak = async () => {
    const speaking = await Speech.isSpeakingAsync();

    if (speaking) {
      await Speech.stop();
      setIsSpeaking(false);
      setHighlightedIndex(-1);
      return;
    }

    setIsSpeaking(true);
    setHighlightedIndex(0);

    Speech.speak(banglaText, {
      language: 'bn-BD',
      pitch: 1.0,
      rate: 0.9,
      onBoundary: (e) => {
        // charIndex tells us where in the string we are
        // find which word index corresponds to that character position
        let charCount = 0;
        for (let i = 0; i < words.length; i++) {
          charCount += words[i].length + 1; // +1 for space
          if (charCount > e.charIndex) {
            setHighlightedIndex(i);
            break;
          }
        }
      },
      onDone: () => {
        setIsSpeaking(false);
        setHighlightedIndex(-1);
      },
      onError: () => {
        setIsSpeaking(false);
        setHighlightedIndex(-1);
        Alert.alert(
          'Error',
          'Failed to speak the text. Your device may not support Bangla TTS.',
        );
      },
    });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required.',
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takeImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the camera is required.',
      );
      return;
    }
    await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center bg-gray-50 gap-y-4">
        <Text className="mb-6 text-2xl font-bold">Profile</Text>

        <TouchableOpacity
          className="mb-4 px-4 py-2 border rounded-xl"
          onPress={pickImage}
        >
          <Text className="font-semibold">Pick an image from camera roll</Text>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </TouchableOpacity>

        <TouchableOpacity className="mb-4" onPress={takeImage}>
          <AntDesign name="camera" size={34} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="rounded-xl bg-blue-600 px-6 py-3"
        >
          <Text className="text-base font-semibold text-white">Open Modal</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-11/12 rounded-2xl bg-white p-6 shadow-lg">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-xl font-bold">Modal Title</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text className="mb-6 text-gray-600">
                This is a modal content. You can add any content here like
                forms, images, or any other components.
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="flex-1 rounded-xl border border-gray-300 py-3"
                >
                  <Text className="text-center font-semibold text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="flex-1 rounded-xl bg-blue-600 py-3"
                >
                  <Text className="text-center font-semibold text-white">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Highlighted Bangla Text */}
        <View className="px-6">
          <Text style={styles.paragraph}>
            {words.map((word, index) => (
              <Text
                key={index}
                style={
                  index === highlightedIndex
                    ? styles.highlighted
                    : styles.normal
                }
              >
                {word}
                {index < words.length - 1 ? ' ' : ''}
              </Text>
            ))}
          </Text>

          <TouchableOpacity
            onPress={handleSpeak}
            className={`mt-4 flex-row items-center justify-center gap-x-2 rounded-xl py-3 px-6 ${
              isSpeaking ? 'bg-red-500' : 'bg-green-600'
            }`}
          >
            <Ionicons
              name={isSpeaking ? 'stop-circle' : 'volume-high'}
              size={20}
              color="white"
            />
            <Text className="text-center font-semibold text-white">
              {isSpeaking ? 'থামাও (Stop)' : 'পড়ো (Read Aloud)'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
  },
  normal: {
    color: '#1f2937',
  },
  highlighted: {
    backgroundColor: '#FDE68A', // yellow highlight
    color: '#92400E', // dark amber text
    borderRadius: 4,
  },
});
