import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import BottomNavIcon from "../components/BottomNavIcon";
import { TaskProvider, useTask } from "../components/TaskContext";
import HeaderMenu from "../components/HeaderMenu";

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
        headerShown: true,
        headerStyle: {
          backgroundColor: "#FFF5E1", 
          borderBottomWidth: 1,
          borderBottomColor: "#E0E0E0",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#305361", 
        },
        headerTintColor: "#305361", 
        headerTitleAlign: "center",
      }}
    >
      {/* active tab */}
      <Tabs.Screen
        name="active/index"
        options={{
          title: "Active Tasks",
          headerTitle: "Active Tasks",
          tabBarLabel: "Active",
          headerRight: () => <HeaderMenu screenType="active" />,
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

      {/* completed tab */}
      <Tabs.Screen
        name="completed/index"
        options={{
          title: "Completed Tasks",
          headerTitle: "Completed Tasks", 
          tabBarLabel: "Completed",
          headerRight: () => <HeaderMenu screenType="completed" />,
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

      <Tabs.Screen
        name="add-task"
        options={{
          href: null,
          headerShown: true,
          headerTitle: "Add New Task",
          headerStyle: {
            backgroundColor: "#FFF5E1",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#305361",
          },
          headerTintColor: "#305361",
        }}
      />

      <Tabs.Screen
        name="edit-task/[id]"
        options={{
          href: null, 
          headerShown: true,
          headerTitle: "Edit Task",
          headerStyle: {
            backgroundColor: "#FFF5E1",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#305361",
          },
          headerTintColor: "#305361",
        }}
      />

      <Tabs.Screen
        name="[id]"
        options={{
          href: null, 
          headerShown: true,
          headerTitle: "Task Details",
          headerStyle: {
            backgroundColor: "#FFF5E1",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#305361",
          },
          headerTintColor: "#305361",
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          href: null, 
          headerShown: true,
          headerTitle: "Settings",
          headerStyle: {
            backgroundColor: "#FFF5E1",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#305361",
          },
          headerTintColor: "#305361",
        }}
      />

      <Tabs.Screen
        name="help"
        options={{
          href: null,
          headerShown: true,
          headerTitle: "Help & Support",
          headerStyle: {
            backgroundColor: "#FFF5E1",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#305361",
          },
          headerTintColor: "#305361",
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