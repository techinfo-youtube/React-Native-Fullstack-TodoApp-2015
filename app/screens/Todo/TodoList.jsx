import { View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TodoItem from "../../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodos } from "../../redux/features/todoSlice";
import SearchInput from "../../components/SearchInput";
import { useFocusEffect } from "@react-navigation/native";

const TodoList = () => {
  const [searchtext, setSearchtext] = useState("");

  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.todo);

  const filteredTodos = searchtext
    ? todo?.filter((todoItem) =>
        todoItem.title.toLowerCase().includes(searchtext.toLowerCase())
      )
    : todo;

  useFocusEffect(
    useCallback(() => {
      const fetchTodos = async () => {
        const localData = await AsyncStorage.getItem("appData");
        const appData = JSON.parse(localData);
        if (appData) {
          dispatch(getTodos(appData?.user?.id));
        }
      };
      fetchTodos();
    }, [])
  );

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const storeUserId = await AsyncStorage.getItem("userId");
  //       if (storeUserId) {
  //         dispatch(getTodos(storeUserId));
  //       }
  //     } catch (error) {
  //       console.log("Error While Getting user id", error);
  //     }
  //   };
  //   fetchTodos();
  // }, [dispatch]);
  return (
    <View>
      <SearchInput searchtext={searchtext} setSearchtext={setSearchtext} />
      <FlatList
        data={filteredTodos}
        renderItem={({ item }) => <TodoItem item={item} />}
      />
      {/* <LoadingSpinner /> */}
    </View>
  );
};

export default TodoList;
