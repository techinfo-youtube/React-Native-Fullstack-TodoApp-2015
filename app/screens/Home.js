import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllTodos from './Todos/AllTodos';
import CreateTodo from './Todos/CreateTodo';
import Welcome from './Welcome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Logout from './Auth/Logout';

const Tab = createBottomTabNavigator();
const Home = () => {

    return (
        <Tab.Navigator screenOptions={{
            tabBarInactiveTintColor: '#8392AB',
            tabBarActiveTintColor: '#fff',
            tabBarActiveBackgroundColor: '#627594',
            tabBarStyle: { backgroundColor: '#252f40' }, // Dark background for tabs
            headerShown: false
        }}  >
            <Tab.Screen name="Home" component={Welcome}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="home"
                            size={24}
                            color={focused ? '#FFFFFF' : '#8392AB'} // Change color based on focus
                        />
                    ),
                }} />
            <Tab.Screen name="Create Todo" component={CreateTodo}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="add-box"
                            size={24}
                            color={focused ? '#FFFFFF' : '#8392AB'} // Change color based on focus
                        />
                    ),
                }} />
            <Tab.Screen name="Todos" component={AllTodos}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="list-alt"
                            size={24}
                            color={focused ? '#FFFFFF' : '#8392AB'}// Change color based on focus
                        />
                    ),
                }} />
            <Tab.Screen name="Account" component={Logout}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="account-circle"
                            size={24}
                            color={focused ? '#ffffff' : '#8392AB'} // Customize the color for active and inactive
                        />
                    ),

                }} />
        </Tab.Navigator>
    );
};

const style = StyleSheet.create({

});

export default Home;