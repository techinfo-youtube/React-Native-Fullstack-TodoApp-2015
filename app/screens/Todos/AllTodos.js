import { View, Text, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import TodoData from '../../data/TodoData.json';
import TodoItem from '../../components/TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../redux/features/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchInput from '../../components/SearchInput';
import LoadinSpinner from '../../components/LoadinSpinner';
import { useFocusEffect } from '@react-navigation/native';

const AllTodos = () => {
    const [searchText, setSearchText] = useState('');
    // const [userId, setUserId] = useState('');
    const dispatch = useDispatch();
    const { todo, loading } = useSelector((state) => state?.todo);
    const { user } = useSelector((state) => state?.auth);


    const filteredTodos = searchText
        ? todo?.filter((todoItem) =>
            todoItem.title.toLowerCase().includes(searchText.toLowerCase())
        )
        : todo;

    // useEffect(() => {
    //     dispatch(getTodos(user?.id));
    // }, [dispatch]);
    useFocusEffect(
        useCallback(() => {
            const fetchTodos = async () => {
                // const userId = await AsyncStorage.getItem('userId');
                const localData = await AsyncStorage.getItem('appData');
                const appData = JSON.parse(localData);
                if (appData) {
                    dispatch(getTodos(appData?.user?.id));
                }
            };
            fetchTodos();
        }, [])
    );

    return (
        <View>
            <SearchInput searchText={searchText} setSearchText={setSearchText} />
            <FlatList data={filteredTodos} renderItem={({ item }) => (<TodoItem item={item} />)} />
        </View>
    );
};

export default AllTodos;