import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, updateTodo } from '../../redux/features/todoSlice';
import DropDownPicker from 'react-native-dropdown-picker';


const EditTodo = () => {
    const route = useRoute();
    const { item } = route.params;

    const [isEdit, setisEdit] = useState(false);

    const [todoTitle, setTodoTitle] = useState(item.title);
    const [todoDesc, setTodoDesc] = useState(item.description);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(item.isCompleted);
    const [items, setItems] = useState([
        { label: 'Completed', value: true },
        { label: 'Incomplete', value: false }
    ]);
    console.log(value);
    const navigation = useNavigation();
    const { loading, error, success, todo } = useSelector((state) => state?.todo);
    const dispatch = useDispatch();

    //handle submit
    const handleUpdte = (id) => {
        if (todoTitle.trim() == '' || todoDesc.trim() == '') {
            return Alert.alert('Warning', 'Please add title or description');
        }
        const updatedTodo = {
            ...todo,
            title: todoTitle,
            description: todoDesc,
            isCompleted: value
        };
        dispatch(updateTodo({ id, updatedTodo }));
        if (success) {
            Alert.alert('Success', 'Your Todo updated');
            // navigation.navigate('Home Screen');
            navigation.goBack();

        }
        if (error) {
            Alert.alert('Error', error);
        }
        console.log('updatedTodo ==>', id);
    };
    useEffect(() => { }, []);

    //handle Delete
    const handleDelete = (id) => {
        Alert.alert('Success', 'Your task deleted successfully');
        dispatch(deleteTodo(id));
        console.log('deleteid', id);
        navigation.navigate('Home Screen', { screen: 'Todos' });
    };
    return (
        <View style={styles.formContainer}>
            {isEdit &&
                <Text style={styles.title}>Edit Your Todo <MaterialIcons onPress={() => setisEdit(false)} name="cancel" style={styles.icon} /> </Text>
            }
            <TextInput
                style={isEdit ? styles.inputOnEdit : styles.input}
                value={todoTitle}
                onChangeText={text => setTodoTitle(text)}
                editable={isEdit}
            />
            <TextInput
                style={isEdit ? styles.inputOnEdit : styles.input}
                value={todoDesc}
                onChangeText={text => setTodoDesc(text)}
                multiline
                numberOfLines={10}
                editable={isEdit}

            />

            {!isEdit ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={`Date : ${item?.createdAt.substring(0, 10)} `}
                        readOnly={true}
                    />

                    <Text style={styles.status}>Status : {item?.isCompleted ? 'Completed' : 'Incomplete'}</Text>
                    {/* <Text>Status : </Text> */}
                    <TouchableOpacity onPress={() => setisEdit(true)} style={styles.btn}   >
                        <Text style={styles.btnText}>Edit Todo <MaterialIcons name="edit" /></Text>
                    </TouchableOpacity>
                </>
            )
                : (<>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select priority"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => handleUpdte(item?._id)} style={styles.btn}   >
                            <Text style={styles.btnText}>UPDATE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item?._id)} style={styles.deleteBtn}   >
                            <Text style={styles.btnText}>DELETE</Text>
                        </TouchableOpacity>
                    </View>
                </>
                )
            }
        </View>
    );
};


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#627594',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    EditTitle: {
        backgroundColor: 'green',
        fontSize: 20,
        paddingHorizontal: 20,
        color: '#fff',
        borderRadius: 10
    },
    icon: {
        fontSize: 20,

    },
    formContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    input: {
        width: '90%',
        paddingHorizontal: 10,
        textTransform: 'capitalize',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    inputOnEdit: {
        borderWidth: 1,
        width: '90%',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop: 20,
        minHeight: 100
    },
    inputDesc: {
        textAlign: 'justify',
        width: '90%',
        paddingHorizontal: 10,
    },
    date: {
        fontSize: 15,

    },
    btnContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,

    },
    btn: {
        backgroundColor: '#252f40',
        width: 110,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 15,
        marginRight: 20
    },
    deleteBtn: {
        backgroundColor: 'red',
        width: 110,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 15
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14

    },
    status: {
        width: '90%',
        marginTop: 10,
        paddingLeft: 10,
        marginBottom: 20,
        fontWeight: '700',
        color: '#627594'
    },
    dropdown: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginVertical: 20,
    }

});

export default EditTodo;