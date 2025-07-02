import { Tabs } from "expo-router";
import BottomNavIcon from "../../components/BottomNavIcon";

export default function TabsLayout() {
  const tabs = [
    {
      name: "active/index",
      title: "To-Do",
      icon: "menu-outline",
      iconFocused: "menu",
    },
    {
      name: "completed/index",
      title: "Completed",
      icon: "folder-outline",
      iconFocused: "folder",
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#305361",
        tabBarInactiveTintColor: "#aaf",
      }}
    >
      {tabs.map(({ name, title, icon, iconFocused }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <BottomNavIcon
                name={focused ? iconFocused : icon}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}