import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="mb-6 text-2xl font-bold">Profile</Text>

      {/* Button to open modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="rounded-xl bg-blue-600 px-6 py-3"
      >
        <Text className="text-base font-semibold text-white">Open Modal</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // presentationStyle='overFullScreen'
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-11/12 rounded-2xl bg-white p-6 shadow-lg">
            {/* Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold">Modal Title</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <Text className="mb-6 text-gray-600">
              This is a modal content. You can add any content here like forms,
              images, or any other components.
            </Text>

            {/* Actions */}
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
                onPress={() => {
                  // Handle confirm action
                  setModalVisible(false);
                }}
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
    </View>
  );
};

export default Profile;
