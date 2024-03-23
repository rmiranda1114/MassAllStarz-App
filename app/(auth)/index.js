import React, { useContext, useState } from 'react'
import { Text, StyleSheet, View, ScrollView, TextInput, Pressable, Image, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import axios from '../../axios/axios';
import AppContext from '../../context/AppContext';
import { Feather } from '@expo/vector-icons';

const Login = () => {
    const { setUser } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false)
    const router = useRouter();

    const saveJWT = async (key, value) => {
        await SecureStore.setItemAsync(key, value)
    }

    const handleSubmit = async () => {
        try{
            const userData = {
                email: email.toLocaleLowerCase(),
                password: password
            }
            const response = await axios.post('users/login', userData);
            
            if (response.status == 200) {
                saveJWT("Token", response.data.accessToken);
                setUser({
                    name: response.data.name,
                    email: response.data.email,
                    _id: response.data._id,
                    admin: response.data.admin,
                    coach: response.data.coach,
                    team: response.data.team || [],
                    player: response.data.player || []

                });
                router.push({
                        pathname:"(app)"
                    });
                }    
        } catch(error){
            if (error.response.status == 401) {
                Alert.alert('Invalid Email or Password')
            } else if (error.request) {
                Alert.alert('Unable to make request') 
            }
            
            console.log("Unable to log in", error.response.status);
        }
    }
    
    return (
      <ScrollView keyboardShouldPersistTaps={'always'}>
       
        <View>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/MASLogo.jpg')}
                    style={styles.image}
                />
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.loginCard}>
                    <TextInput 
                        style={{flex: 1}}
                        value={email}
                        placeholder='Email'
                        onChangeText={(text) => setEmail(text)}
                        autoComplete='email'
                        inputMode="email"
                    />
                </View>
                <View style={styles.loginCard}>
                    <TextInput
                        style={{flex: 1}} 
                        value={password}
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={!viewPassword}
                    />
                    {viewPassword ? <Feather name="eye-off" size={24} color="black"  onPress={() => setViewPassword(false)} /> 
                        : <Feather name="eye" size={24} color="black" onPress={() => setViewPassword(true)}/>}
                </View>
                <Pressable onPress={() => handleSubmit()} style={styles.button}>
                    <Text>Log In</Text>
                </Pressable>
                <Pressable onPress={() => router.push('(auth)/register')} style={styles.link}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 50
    },
    image: {
        width: 300,
        height: 300,
        borderRadius:20
    },
    loginContainer: {
        marginHorizontal: 15
    },
    loginCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderStyle: 'solid',
        backgroundColor: "#D9DCDF",
        padding: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#2395E2',
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    link: {
        padding: 10,
        marginTop: 10
    },
    linkText: {
        color: "#1B45FE",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500'
    }
})

export default Login