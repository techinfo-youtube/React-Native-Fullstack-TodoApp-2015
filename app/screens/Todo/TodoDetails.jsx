import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  resetTodoState,
  updateTodo,
} from "../../redux/features/todoSlice";
import DropDownPicker from "react-native-dropdown-picker";

const TodoDetails = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const [isEdit, setIsedit] = useState(false);
  const [todoTitle, setTodoTitle] = useState(item?.title);
  const [todoDesc, setTodoDesc] = useState(item?.description);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.isCompleted);
  const [items, setItems] = useState([
    { label: "Completed", value: true },
    { label: "InComplete", value: false },
  ]);

  const dispatch = useDispatch();
  const { todo, success, error } = useSelector((state) => state.todo);

  //handle update
  const handleUpdate = (id) => {
    if (todoTitle.trim() == "" || todoDesc.trim() == "") {
      return Alert.alert("Warning", "Please add todo title or descriotion");
    }
    const updatedTodo = {
      ...todo,
      title: todoTitle,
      description: todoDesc,
      isCompleted: value,
    };
    dispatch(updateTodo({ id, updatedTodo }));
    if (success) {
      dispatch(resetTodoState());
      Alert.alert("success", "Your todo has been Updated");
      navigation.navigate("Home", { screen: "Todo List" });
    }
    if (error) {
      dispatch(resetTodoState());
      Alert.alert("Failed", error);
    }
  };
  useEffect(() => {}, [error, success]);
  //handle Delete
  const handleDelete = (id) => {
    Alert.alert("Success", "Your Todo Deleeted!");
    dispatch(deleteTodo(id));
    navigation.navigate("Home", { screen: "Todos" });
  };

  return (
    <View style={styles.formContainer}>
      {isEdit && (
        <Text style={styles.title}>
          Edit Your Todo{" "}
          <MaterialIcons
            name="cancel-presentation"
            size={20}
            onPress={() => setIsedit(false)}
          />
        </Text>
      )}
      <TextInput
        value={todoTitle}
        editable={isEdit}
        style={isEdit ? styles.inputEdit : styles.input}
        onChangeText={(text) => setTodoTitle(text)}
      />
      <TextInput
        value={todoDesc}
        editable={isEdit}
        multiline
        numberOfLines={10}
        style={isEdit ? styles.inputEdit : styles.input}
        onChangeText={(text) => setTodoDesc(text)}
      />
      <TextInput
        value={`Date : ${item?.createdAt.substring(0, 10)}`}
        readOnly={true}
        style={styles.date}
      />
      <Text style={styles.status}>
        Status : {item?.isCompleted ? "Completed" : "Incomplete"}
      </Text>
      {!isEdit ? (
        <TouchableOpacity onPress={() => setIsedit(true)} style={styles.btn}>
          <Text style={styles.btntext}>Edit Todo </Text>
        </TouchableOpacity>
      ) : (
        <>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Status"
            style={styles.dropdown}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => handleUpdate(item?._id)}
              style={styles.btn}
            >
              <Text style={styles.btntext}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item?._id)}
              style={styles.btnDelete}
            >
              <Text style={styles.btntext}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    color: "#627594",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  input: {
    width: "90%",
    paddingHorizontal: 10,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  inputEdit: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    minHeight: 100,
  },
  date: {
    width: "90%",
    fontSize: 20,
    marginTop: 20,
  },
  btnContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  btn: {
    backgroundColor: "#252f40",
    width: 110,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 15,
  },
  btnDelete: {
    backgroundColor: "red",
    width: 110,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 15,
  },
  btntext: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  status: {
    width: "90%",
    marginTop: 10,
    paddingLeft: 10,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#627594",
  },
  dropdown: {
    width: "90%",
    justifyContent: "center",
    marginLeft: 25,
    marginVertical: 20,
  },
});

export default TodoDetails;
