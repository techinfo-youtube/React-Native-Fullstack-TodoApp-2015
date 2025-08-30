import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AllTodos from './screens/Todos/AllTodos';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import { useEffect, useState } from 'react';
import CreateTodo from './screens/Todos/CreateTodo';
import EditTodo from './screens/Todos/EditTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken } from './redux/features/authSlice';
const Stack = createNativeStackNavigator();

const RootRoutes = () => {

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadToken());
    }, []);
    return (
        <>

            <Stack.Navigator initialRouteName={`${token && token ? 'Home Screen' : 'Login'}`} screenOptions={{ headerShown: false }} >
                {token ? (
                    <>
                        <Stack.Screen name="Home Screen" component={Home} />
                        <Stack.Screen name="Todo Details" component={EditTodo} options={{ headerShown: true }} />
                        <Stack.Screen name="Todos" component={AllTodos} />
                        <Stack.Screen name="Create a Todo" component={CreateTodo} />
                    </>
                ) :
                    (
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