import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { useEffect } from 'react';
import { getUserData, logout } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';

const Logout = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state?.auth);
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    //LOGUT
    const handleLogout = () => {
        Alert.alert('Success', 'Your logout successfully');
        dispatch(logout());
        AsyncStorage.removeItem('appData');
    };
    return (
        <View >
            <View style={styles.userContainer}>
                <Image source={require('../../../assets/images/user.png')} style={styles.userPic} />
            </View>
            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <TextInput style={styles.name} value={`Username : ${user?.username}`} readOnly={true} />
                <TextInput style={styles.name} value={`Email : ${user?.email}`} readOnly={true} />
            </View>
            <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
                <Text style={styles.btnText}>Logout {' '}
                    <AntDesign name="logout" size={20} />
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#abb8ceff',
        width: '100%',
        elevation: 3,
        minHeight: 300
    },
    userPic: {
        height: 200,
        width: 200,
    },
    name: {
        fontSize: 15,
        backgroundColor: '#fff',
        marginTop: 10,
        width: '90%',
        borderRadius: 5,
        paddingLeft: 20
    },
    btnLogout: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 15,
        height: 50
    },
    btnText: {
        fontSize: 20,
        color: '#fff'
    }
});

export default Logout;