import React, { useEffect, useState, useContext } from "react";
import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import AppState from '../../context/AppContext';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from 'expo-router';
import axios from '../../axios/axios'
import { Ionicons } from '@expo/vector-icons';

const Users = () => {
    const { user, setUser } = useContext(AppState);
    const [userData, setUserData] = useState();
    const navigation = useNavigation();

    const fetchUser = async () => {
        try {
            const response = await axios.post('/users/user', { name: user.name });
            setUserData(response.data);
        } catch (error) {
            console.log("Error fetching user data", error)
        }
    }

    const deleteUser = async () => {
        try {
            const response = await axios.post('/users/delete', { user: user._id });
            setUser({});
            SecureStore.deleteItemAsync('Token');
            Alert.alert("Your account has been deleted");
            navigation.reset({
                index: 0,
                routes: [{ name: '(auth)'}]
            })
        } catch (error) {
            console.log("Error deleting user data", error)
        }
    }
    
    const createAlert = () => {
        Alert.alert(
            "Delete User:",
            'Are you sure you want to delete this account?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deleteUser(),
                    style: 'default'
                }
            ],
            {
                cancelable: true
            }
            )
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <View>
            {userData && <View style={styles.container}>            
                <Text style={styles.text}>{userData.name}</Text>
                <Text>Email: {userData.email}</Text>
                <Text>Coach: {userData.coach ? 'Yes' : 'No'}</Text>
                <Text>Admin: {userData.admin ? 'Yes' : 'No'}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Team: </Text>
                    {userData.team.map((team) => <View key={team._id}><Text>{`${team.name} `}</Text></View>)}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Player: </Text>
                    {userData.player.map((player) => <View key={player._id}><Text>{`${player.playerName} `}</Text></View>)}
                </View>           
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => createAlert()}>
                        <Text>Delete Account</Text>
                </Pressable>
            </View>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        backgroundColor: '#E3E3E3',
        padding: 25,
        margin: 20,
        borderRadius: 10,
        gap: 10
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})

export default Users;