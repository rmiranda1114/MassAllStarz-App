import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, Alert  } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from '../../axios/axios'

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;

const createUser = () => {
    const router = useRouter();
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [regCode, setRegCode] = useState('');
    const [regCodeFocus, setRegCodeFocus] = useState(false);

    //Set focus for screenreaders
    useEffect(() => {
        userRef.current.focus();
    },[]);

    //Test username every time it is changed
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    },[email]);

    //Test password and confirm password whenever either are changed
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
        const match = password === matchPwd;
        setValidMatch(match);
    },[password, matchPwd]);

    //Resets error once its been read and update begins 
    useEffect(() => {
        setErrMsg('');
    },[email, password, matchPwd])

    const handleAddUser = async () => {
        try{
            const userData = {
                name,
                email: email.toLocaleLowerCase(),
                password,
                regCode
            };

            //prevent button enable with JS hack
            const v1 = EMAIL_REGEX.test(email);
            const v2 = PWD_REGEX.test(password);
            if (!v1 || !v2) {
                setErrMsg("Invalid Entry");
                return;
            }

            
            const response = await axios.post('/users/new', userData)
            if (response.status == 200) {
                Alert.alert("Successful", "User has been created");
                setName("");
                setEmail("");
                setPassword("");}
                router.push('(auth)/')
        } catch (error) {
            if (error.response.status == 409) {
                Alert.alert('Email is already registered')
            } else if (error.response.status == 412) {
                Alert.alert('Invalid Registration Code') 
            } else if (error.request) {
                Alert.alert('Unable to make request') 
            }
            console.log("Add user failed", error.response.status);
        };
        
    };

    return (
        <ScrollView keyboardShouldPersistTaps={'always'}  style={styles.container}>
            <View>
                <View style={styles.inputContainer}>
                    {errMsg && <Text style={styles.errorText} ref={errRef} aria-live="assertive">{errMsg}</Text>}
                    <View style={styles.label}>
                        <Text style={styles.header}>Name</Text>
                    </View>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.textInput} 
                        placeholder="John Smith"
                        ref={userRef}
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.label}>
                        <Text style={styles.header}>Email</Text>
                        {validEmail && <AntDesign name="check" size={24} color="green" />}
                        {email && !validEmail && <Feather name="x" size={24} color="red" />}
                    </View>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.textInput} 
                        placeholder="john123@gmail.com"
                        ref={userRef}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        autoComplete="email"
                        inputMode="email"
                        textContentType="username"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.label}>
                        <Text style={styles.header}>Password</Text>
                        {validPwd && <AntDesign name="check" size={24} color="green" />}
                        {password && !validPwd && <Feather name="x" size={24} color="red" />}
                    </View>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.textInput} 
                        placeholder="New Password"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        maxLength={16}
                        textContentType="newPassword"
                        secureTextEntry={true}
                        
                    />
                </View>
                <View style={styles.pwdNote}>
                    <Text>6 to 16 characters</Text>
                    <Text>Must include uppercase and lowercase letters and a number.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.label}>
                        <Text style={styles.header}>Confirm Password</Text>
                        {matchPwd && validMatch && <AntDesign name="check" size={24} color="green" />}
                        {matchPwd && !validMatch && <Feather name="x" size={24} color="red" />}
                    </View>
                    <TextInput
                        value={matchPwd}
                        onChangeText={(text) => setMatchPwd(text)}
                        style={styles.textInput} 
                        placeholder="Confirm Password"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        maxLength={16}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.label}>
                        <Text style={styles.header}>Registration Code</Text>
                    </View>
                    <TextInput
                        value={regCode}
                        onChangeText={(text) => setRegCode(text)}
                        style={styles.textInput} 
                        placeholder="Ab1C23"
                        onFocus={() => setRegCodeFocus(true)}
                        onBlur={() => setRegCodeFocus(false)}
                    />
                </View>
                

                <Pressable 
                    style={styles.button}
                    onPress={handleAddUser}
                    disabled={!validEmail || !validPwd || !validMatch ? true : false}    
                >
                    <Text>Register</Text>
                </Pressable>
                <Pressable style={styles.link} onPress={() => router.push('/')}>
                    <Text style={styles.linkText}>Already have an account?</Text>
                </Pressable>
            </View>            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#E3E3E3'
    },
    inputContainer: {
        padding: 10,
    },
    header: {
        fontSize: 17,
        fontWeight: "bold"
    },
    label: {
        flexDirection: 'row'
    },
    textInput: {
        padding: 10,
        borderColor:"#D0D0D0",
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5
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
    pwdNote: {
        marginLeft: 25
    },
    errorText : {
        color: "red",
        fontWeight: '500'
    },
    link: {
        padding: 10,
        marginTop: 10
    },
    linkText: {
        color: "#1B45FE",
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500'
    }
})

export default createUser;