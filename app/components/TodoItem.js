import { View, Text, StyleSheet, Touchable, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const TodoItem = ({ item }) => {
    const navigation = useNavigation();

    const handlePress = (item) => {
        navigation.navigate('Todo Details', { item });
    };
    return (
        <Pressable onPress={() => handlePress(item)}>
            <View style={styles.card} >
                <Text style={styles.todoTitle}>{item?.title}
                </Text>
                <Text style={styles.todoDesc}>{item?.description}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 15,
        padding: 10
    },
    todoTitle: {
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'justify',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginBottom: 10,
        textTransform: 'capitalize'
    },
    todoDesc: {
        color: "gray",
        textAlign: 'justify'
    }
});

export default TodoItem;