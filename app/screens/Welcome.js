import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Welcome = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    return (
        <View style={style.container}>
            <View style={style.greetContianer}>
                <Image source={require('../../assets/images/greeting.png')} style={style.greet} />
                <Text style={style.todoTitle}>Welcome {''}
                    <Text style={style.user}>{user?.username}</Text>
                </Text>
            </View>
            <Image source={require('../../assets/images/todo.jpg')} style={style.TaskImage} />
            <View style={style.textContainer}>
                <Text style={style.todo}>TODO APP </Text>
                <Text style={style.appTitle}>Lets manage your task</Text>
                <Text style={style.para}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex cumque eum expedita nostrum molestias veritatis esse voluptatibus. Doloribus atque ullam doloremque voluptate natus eos praesentium error sed nostrum iusto!</Text>
            </View>
        </View >
    );
};


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    greetContianer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        width: '100%',
        backgroundColor: '#fff'
    },
    greet: {
        height: 50,
        width: 50
    },
    todoTitle: {
        fontSize: 20,
        paddingVertical: 20,
    },
    user: {
        color: 'green',
        textTransform: 'capitalize'
    },
    appTitle: {
        fontSize: 20,
        marginVertical: 10,
        borderRadius: 5

    },
    TaskImage: {
        height: 320,
        width: '100%',
        backgroundColor: 'transparent'
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    todo: {
        backgroundColor: '#000',
        color: '#fff',
        padding: 10,
        borderRadius: 5
    },
    para: {
        fontSize: 14,
        textAlign: 'justify',
        paddingHorizontal: 20,
        color: '#768194ff'
    },
    btn: {
        marginTop: 20,
        backgroundColor: '#627594',
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 5
    },
    btnTitle: {
        color: '#FFFFFF',

    }

});
export default Welcome;