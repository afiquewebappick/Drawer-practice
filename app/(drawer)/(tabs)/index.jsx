import { View, Text, ScrollView, Switch, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import axios from 'axios';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import * as Linking from 'expo-linking';
import * as Progress from 'react-native-progress';

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(res.data);
      setTimeout(() => setLoading(false), 5000);
    } catch (error) {
      console.log(error);
    }
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
        <Progress.Bar progress={progress} width={200}/>
      </View>
    );
  }

  return (
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

        <Button title="Open Profile 25 using Deep Link" onPress={openProfile} />

        <Link href="/google">Open Google Inside App</Link>
      </View>

      <View className="mt-4">
        <Text className="text-xl">Total todos: {todos.length}</Text>
      </View>

      <View className="mt-4">
        <Text className="text-xl">Todo List:</Text>

        {todos.slice(0, 10).map((todo, i) => (
          <View key={i} className="bg-gray-100 mt-2 p-2">
            <Text>{todo.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Index;
