import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import TodoList from "./screens/Todo/TodoList";
import TodoDetails from "./screens/Todo/TodoDetails";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { loadToken } from "./redux/features/authSlice";

const Stack = createNativeStackNavigator();

const RootRoutes = () => {
  const disptach = useDispatch();
  const { token } = useSelector((state) => state.auth);
  console.log("auth token===>", token);

  useEffect(() => {
    disptach(loadToken());
  }, []);
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Todo List" component={TodoList} />
            <Stack.Screen
              name="Todo Details"
              component={TodoDetails}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootRoutes;
