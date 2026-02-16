import {
  View,
  Text,
  ScrollView,
  Switch,
  Button,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import axios from 'axios';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import * as Linking from 'expo-linking';
import * as Progress from 'react-native-progress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const audioSource = require('../../../assets/audio/001.mp3');

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const insets = useSafeAreaInsets();
  const player = useAudioPlayer(audioSource);
  const playerStatus = useAudioPlayerStatus(player);
  // console.log(JSON.stringify(playerStatus, null, 2));

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(res.data);
      setTimeout(() => setLoading(false), 300);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle play/pause with restart capability
  const handlePlayPause = () => {
    if (playerStatus.playing) {
      player.pause();
    } else {
      // If audio has ended, restart from beginning
      if (playerStatus.currentTime >= playerStatus.duration) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  // Skip backward 10 seconds
  const handleSkipBackward = () => {
    const newTime = Math.max(0, playerStatus.currentTime - 10);
    player.seekTo(newTime);
  };

  // Skip forward 10 seconds
  const handleSkipForward = () => {
    const newTime = Math.min(
      playerStatus.duration,
      playerStatus.currentTime + 10,
    );
    player.seekTo(newTime);
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openProfile = () => {
    const url = 'drawerpractice://profile/25';
    Linking.openURL(url);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setProgress(1);
      return;
    }

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setLoading(false);
          return 1;
        }
        return prev + 0.2;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Progress.Bar progress={progress} width={200} />
      </View>
    );
  }

  const progressValue =
    playerStatus.duration > 0
      ? playerStatus.currentTime / playerStatus.duration
      : 0;

  return (
    <>
      <ScrollView className="bg-white px-2">
        <Animated.View className="mt-4" entering={FadeIn}>
          <Link href={'/outside'}>
            <Text className="text-xl">Click to go Outside</Text>
          </Link>
        </Animated.View>

        <Animated.View className="mt-4 flex-row gap-6" entering={FadeInRight}>
          <Link href={'/chat-modal'} disabled={isOn}>
            <Text className="text-xl">Click to go Chat Modal</Text>
          </Link>
          <Switch
            className="scale-75"
            trackColor={{ true: '#7a77aa' }}
            value={isOn}
            onValueChange={() => setIsOn(!isOn)}
          />
        </Animated.View>

        <View style={{ padding: 20 }}>
          {/* <Text style={{ fontSize: 20 }}>Home Screen</Text> */}

          <Button
            title="Open Profile 25 using Deep Link"
            onPress={openProfile}
          />

          <Link href="/google">Open Google Inside App</Link>
        </View>

        <View className="mt-4">
          <Text className="text-xl">Total todos: {todos.length}</Text>
        </View>

        <View className="mt-4">
          <Text className="text-xl">Todo List:</Text>

          {todos.slice(0, 20).map((todo, i) => (
            <View key={i} className="bg-gray-100 mt-2 p-2">
              <Text>{todo.title}</Text>
            </View>
          ))}
        </View>

        <View style={{
          paddingBottom: insets.bottom + 200
        }}></View>
      </ScrollView>

      <View
        className="absolute bottom-0 right-0 left-0 z-50 bg-white border-t border-gray-200 pt-6"
        style={{
          paddingBottom: insets.bottom + 40,
        }}
      >
        <View className="px-6 py-5">
          <View className="mb-2">
            <Progress.Bar
              progress={progressValue}
              width={null}
              height={4}
              borderWidth={0}
              color="#7a77aa"
              unfilledColor="#e5e5e5"
              borderRadius={2}
            />
          </View>

          <View className="flex-row justify-between mb-4">
            <Text className="text-xs text-gray-500">
              {formatTime(playerStatus.currentTime)}
            </Text>
            <Text className="text-xs text-gray-500">
              {formatTime(playerStatus.duration)}
            </Text>
          </View>

          <View className="flex-row items-center justify-center gap-x-8">
            <Pressable
              onPress={handleSkipBackward}
              className="active:opacity-50"
            >
              <View className="items-center">
                <Ionicons name="play-back" size={24} color="#7a77aa" />
              </View>
            </Pressable>

            <Pressable
              onPress={handlePlayPause}
              className="active:opacity-50"
              style={{
                backgroundColor: '#7a77aa',
                borderRadius: 25,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name={playerStatus.playing ? 'pause' : 'play'}
                size={28}
                color="white"
              />
            </Pressable>

            <Pressable
              onPress={handleSkipForward}
              className="active:opacity-50"
            >
              <View className="items-center">
                <Ionicons name="play-forward" size={24} color="#7a77aa" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default Index;

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Button, Alert } from "react-native";
// import * as Notifications from 'expo-notifications';
// import { useEffect } from "react";

// Notifications.setNotificationHandler({
//   handleNotification: async ()=>({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false
//   }),
// });

// export default function App() {
//   useEffect(() => {
//     (async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if( status !== 'granted'){
//         Alert.alert("Permission is not granted");
//       }
//     })();
//   },[]);

//   const triggerNotification = async () => {
//     const {status} = await Notifications.getPermissionsAsync();
//     if(status !== 'granted'){
//       Alert.alert("Permission denied");
//       return;
//     }

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Hello",
//       body: "Notification triggered from button press",
//     },
//     trigger: null,
//   });
//   };

//   return (
//     <View style = {styles.container}>
//       <Text>Notification Example</Text>
//       <StatusBar style="auto" />
//       <Button title="Notify" onPress={triggerNotification} />
//     </View>
//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
