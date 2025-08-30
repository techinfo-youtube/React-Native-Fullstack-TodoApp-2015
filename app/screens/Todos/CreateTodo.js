import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, getTodos, resetTodoState } from '../../redux/features/todoSlice';

const CreateTodo = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDesc, setTodoDesc] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.todo);
    const { user } = useSelector((state) => state.auth);


    //handle submit
    const handleSubmit = () => {
        if (todoTitle.trim() == '' || todoDesc.trim() == '') {
            return Alert.alert('Warning', 'Please add title or description');
        }
        dispatch(createTodo({ title: todoTitle, description: todoDesc, createdBy: user?.id }));

    };

    useEffect(() => {
        if (success) {
            Alert.alert('Success', 'Todo Created !');
            setTodoDesc('');
            setTodoTitle('');
            dispatch(resetTodoState());
            navigation.navigate('Todos');
        }
        if (error) {
            Alert.alert('Error', error);
            dispatch(resetTodoState());
        }

    }, [success, error]);

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create a Todo</Text>
                <TextInput placeholder='enter todo title'
                    style={styles.input}
                    value={todoTitle}
                    onChangeText={text => setTodoTitle(text)}
                    re
                />
                <TextInput placeholder='enter todo description'
                    style={styles.inputDesc}
                    value={todoDesc}
                    onChangeText={text => setTodoDesc(text)}
                    multiline
                    numberOfLines={10}

                />
                <TouchableOpacity onPress={handleSubmit} style={styles.btn}  >
                    <Text style={styles.btnText}>CREATE</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginTop: 100,
        color: '#627594',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginVertical: 15,
        width: '90%',
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF'
    },
    inputDesc: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginVertical: 15,
        width: '90%',
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        minHeight: 200,
    },
    btn: {
        backgroundColor: '#252f40',
        width: '90%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        marginVertical: 15
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18

    }
});

export default CreateTodo;