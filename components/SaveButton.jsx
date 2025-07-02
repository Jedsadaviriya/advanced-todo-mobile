import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const SaveButton = ({ children, navigateTo, backgroundColor }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(navigateTo); 
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor || '#007AFF' }]}
      onPress={handlePress}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default SaveButton;