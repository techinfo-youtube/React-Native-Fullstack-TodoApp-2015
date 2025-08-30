import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../redux/features/authSlice';
import AntDesign from '@expo/vector-icons/AntDesign';


const Register = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { error, success, } = useSelector((state) => state.auth);

    const handleRegister = () => {
        if (!username || !password || !email) {
            return Alert.alert('Warning', 'Please enter Username or email or  password');
        }
        setLoading(true);
        dispatch(register({ username, email, password }));
        setLoading(false);
        dispatch(reset());

    };

    useEffect(() => {
        if (success) {
            setLoading(false);
            Alert.alert('Success', 'Registration completed successfully!');
            // Optional: Clear form
            setUserName('');
            setEmail('');
            setPassword('');
            navigation.navigate('Login');
        }
        if (error) {
            setLoading(false);
            Alert.alert('Error', error);
        }
        return () => {
            dispatch(reset()); // 🧹 clean Redux state when unmounted
        };
    }, [success, error]);
    return (
        <>
            <ImageBackground style={styles.background} resizeMode="cover"
                source={require('./bg-image.jpg')}>
                <View style={styles.container} >
                    <View style={styles.card}>
                        <Text style={styles.title}> Register </Text>
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" size={24} color="gray" style={styles.inputIcon} />
                            <TextInput style={styles.input}
                                placeholder='enter username'
                                value={username}
                                onChangeText={text => setUserName(text)}
                                clearButtonMode='while-editing'
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <AntDesign name="mail" size={24} color="gray" style={styles.inputIcon} />
                            <TextInput style={styles.input}
                                placeholder='email'
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
                        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                            <Text style={styles.btnText}>Register</Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Already Registerd? Click Here To
                            <Link screen='Login'> Login!</Link>
                        </Text>
                    </View>

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
        fontWeight: '700',
        letterSpacing: 3

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
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
    },

});
export default Register;