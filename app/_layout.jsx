import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomNavIcon from "../components/BottomNavIcon";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "FFF5E1" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#305361",
          tabBarInactiveTintColor: "#aaf",
        }}
      >
        <Tabs.Screen
          name="active/index"
          options={{
            title: "To-Do",
            tabBarIcon: ({ color, focused }) => (
              <BottomNavIcon name={focused ? "menu" : "menu-outline"} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="completed/index"
          options={{
            title: "Completed",
            tabBarIcon: ({ color, focused }) => (
              <BottomNavIcon name={focused ? "folder" : "folder-outline"} color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}