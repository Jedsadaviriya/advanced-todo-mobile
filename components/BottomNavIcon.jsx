import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons"
import Feather from '@expo/vector-icons/Feather';
 
const BottomNavIcon = ({name, color}) => {
  return (
    <Ionicons
      size={28}
      style={{ marginBottom: -3 }}
      name={name}
      color={color}
    />
  )
}
 
export default BottomNavIcon