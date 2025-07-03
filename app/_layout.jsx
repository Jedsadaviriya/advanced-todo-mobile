import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import BottomNavIcon from "../components/BottomNavIcon";
import { TaskProvider, useTask } from "../components/TaskContext";

// Custom tab bar badge component
function TabBadge({ count }) {
  if (count === 0) return null;
  
  return (
    <View style={{
      position: 'absolute',
      right: -6,
      top: -3,
      backgroundColor: '#FF3B30',
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      }}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

// Custom tab icon with badge
function TabIconWithBadge({ name, color, focused, badgeCount }) {
  return (
    <View style={{ position: 'relative' }}>
      <BottomNavIcon 
        name={focused ? name.replace('-outline', '') : name} 
        color={color} 
      />
      {badgeCount > 0 && <TabBadge count={badgeCount} />}
    </View>
  );
}

function TabsLayout() {
  const { getActiveTasks, getCompletedTasks } = useTask();
  const activeCount = getActiveTasks().length;
  const completedCount = getCompletedTasks().length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#305361",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFF5E1",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="active/index"
        options={{
          title: "Active",
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithBadge
              name="menu-outline"
              color={color}
              focused={focused}
              badgeCount={activeCount}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="completed/index"
        options={{
          title: "Completed",
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithBadge
              name="folder-outline"
              color={color}
              focused={focused}
              badgeCount={completedCount}
            />
          ),
        }}
      />
      {/* Hidden screens */}
      <Tabs.Screen
        name="add-task"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <TaskProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FFF5E1" }}>
        <TabsLayout />
      </GestureHandlerRootView>
    </TaskProvider>
  );
}