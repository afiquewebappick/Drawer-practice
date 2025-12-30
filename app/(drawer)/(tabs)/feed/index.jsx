import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { generateCourseTitles } from "../../../../config/AiModal";

const CourseGenerator = () => {
  const [topic, setTopic] = useState("");
  const [courseTitles, setCourseTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      Alert.alert("Error", "Please enter a topic");
      return;
    }

    setLoading(true);
    try {
      const titles = await generateCourseTitles(topic);
      setCourseTitles(titles);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to generate course titles. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderCourseItem = ({ item, index }) => (
    <View className="mb-3 flex-row items-center rounded-lg bg-gray-50 p-4">
      <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-[#43484B]">
        <Text className="font-semibold text-white">{index + 1}</Text>
      </View>
      <Text className="flex-1 text-base text-gray-800">{item}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="mb-6 text-2xl font-bold">AI Course Generator</Text>

      {/* Input Section */}
      <View className="mb-6">
        <Text className="mb-2 text-base font-medium text-gray-700">
          What do you want to learn?
        </Text>
        <View className="flex-row items-center rounded-lg border border-gray-300 bg-white">
          <TextInput
            className="flex-1 p-4 text-base"
            placeholder="e.g., Python, JavaScript, Machine Learning"
            value={topic}
            onChangeText={setTopic}
            editable={!loading}
          />
          <TouchableOpacity
            className="mr-2 rounded-lg bg-[#43484B] p-3"
            onPress={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <MaterialIcons name="auto-awesome" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading State */}
      {loading && (
        <View className="items-center py-10">
          <ActivityIndicator size="large" color="#43484B" />
          <Text className="mt-4 text-base text-gray-600">
            Generating course titles...
          </Text>
        </View>
      )}

      {/* Results Section */}
      {!loading && courseTitles.length > 0 && (
        <View className="flex-1">
          <Text className="mb-4 text-xl font-semibold">
            Suggested Course Titles:
          </Text>
          <FlatList
            data={courseTitles}
            renderItem={renderCourseItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* Empty State */}
      {!loading && courseTitles.length === 0 && (
        <View className="flex-1 items-center justify-center">
          <MaterialIcons name="school" size={80} color="#E0E0E0" />
          <Text className="mt-4 text-center text-base text-gray-500">
            Enter a topic and tap the magic button {"\n"}to generate course
            titles
          </Text>
        </View>
      )}
    </View>
  );
};

export default CourseGenerator;