import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, ActivityIndicator, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset, } from '../../redux/features/authSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import LoadinSpinner from '../../components/LoadinSpinner';



const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const handleLogin = () => {
        if (!email || !password) {
            return Alert.alert('Warning', 'Please enter Username or password');
        }
        setLoading(true);
        console.log(loading);
        dispatch(login({ email, password }));
        dispatch(reset());
        console.log(loading);
        setLoading(false);


    };
    useEffect(() => {
        if (error) {
            setLoading(false);
            dispatch(reset());
            Alert.alert('Error', error);
        }
        return () => {
            dispatch(reset()); // 🧹 clean Redux state when unmounted
        };
    }, [error]);

    return (
        <>
            <ImageBackground style={styles.background} resizeMode="cover"
                source={require('./bg-image.jpg')}>
                <View style={styles.container} >
                    {loading ? <LoadinSpinner /> : (
                        <>
                            <View style={styles.card}>
                                <Text style={styles.title}>Todo App Login</Text>
                                <View style={styles.inputContainer}>
                                    <AntDesign name="user" size={24} color="gray" style={styles.inputIcon} />
                                    <TextInput style={styles.input}
                                        placeholder='enter username'
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        clearButtonMode='while-editing'
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <AntDesign name="unlock" size={24} color="gray" style={styles.inputIcon} />
                                    <TextInput style={styles.input}
                                        placeholder='enter password'
                                        secureTextEntry={true}
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                    />
                                </View>
                                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                                    <Text style={styles.btnText}>LOGIN</Text>
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'center' }}>Not Registerd Yet ? Click
                                    <Link screen='Register'> Here!</Link>
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lock: {
        height: 200,
        width: 400,
        marginBottom: 30
    },
    card: {
        padding: 20,
        borderRadius: 10,
        width: '90%',
        backgroundColor: '#fff',
        elevation: 5
    },
    title: {
        fontSize: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        fontWeight: '700'

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        marginVertical: 15
    },
    inputIcon: {
        paddingLeft: 20
    },
    input: {
        width: '100%',
        padding: 10,
        paddingLeft: 20,
        color: 'gray'
    },
    btn: {
        backgroundColor: '#000000',
        alignItems: 'center',
        padding: 10,
        marginVertical: 15,
        justifyContent: 'center',
        borderRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
    },

});

export default Login;