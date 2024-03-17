import axios from "axios";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    
    const navigation = useNavigation();
    const [user, setUser] = useState();

    const verifyToken = async () => {
        const data = await SecureStore.getItemAsync('Token');
        const response = await axios.post('http://10.0.0.128:8000/users/verifyToken', { token: data})
        if (response.status == 403) {
            SecureStore.deleteItemAsync('Token');
            Alert.alert("Invalid Token");
            setUser({});
            navigation.reset({
                index: 0,
                routes: [{ name: '(auth)'}]
            });
        }
    }

    const verifyAdminToken = async () => {
        const data = await SecureStore.getItemAsync('Token');
        const response = await axios.post('http://10.0.0.128:8000/users/verifyToken', { token: data})
        if (response.status == 403 || !response.data.admin) {
            SecureStore.deleteItemAsync('Token');
            setUser({});
            Alert.alert("Invalid Token");
            navigation.reset({
                index: 0,
                routes: [{ name: '(auth)'}]
            });
        }
    }

    return (
        <AppContext.Provider value={{ user, setUser, verifyToken, verifyAdminToken }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;