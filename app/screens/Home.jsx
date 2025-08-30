import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./Welcome";
import AddTodo from "./Todo/AddTodo";
import TodoList from "./Todo/TodoList";
import Logout from "./Logout";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "#8392ab",
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#627594",
        tabBarStyle: { backgroundColor: "#252f40" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Welcome"
        component={Welcome}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={24}
              color={focused ? "#ffffff" : "#8392ab"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create Todo"
        component={AddTodo}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="add-box"
              size={24}
              color={focused ? "#ffffff" : "#8392ab"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Todo List"
        component={TodoList}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="list-alt"
              size={24}
              color={focused ? "#ffffff" : "#8392ab"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="power-settings-new"
              size={24}
              color={focused ? "#ffffff" : "#8392ab"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
