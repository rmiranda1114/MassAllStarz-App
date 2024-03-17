import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import AppState from '../../context/AppContext';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AddTeam = () => {
    const { verifyAdminToken } = useContext(AppState);
    const [teamName, setTeamName] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        try{
            const response = await axios.post('http://10.0.0.128:8000/teams', { team: teamName });
            
            if (response.status == 200) {
                Alert.alert('New Team Created');
                router.replace('(app)/teams');
            } 
        } catch(error){    
            console.log("Unable to create team", error.response.status);
        }
    }

    useEffect(() => {
        verifyAdminToken();
    },[])

    return (
        <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={styles.inputContainer}>               
                    <TextInput 
                        style={{flex: 1}}
                        value={teamName}
                        placeholder='New Team Name'
                        onChangeText={(text) => setTeamName(text)}
                    />
            </View>
            <Pressable onPress={() => handleSubmit()} style={styles.button}>
                    <Text style={styles.buttonText}>Create Team</Text>
                </Pressable>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 45,
        marginHorizontal: 15,
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
        padding: 10,
        backgroundColor:'#9BDBFA',
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 15,
        borderRadius: 8
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '500'
    }
})

export default AddTeam;