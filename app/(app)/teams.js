import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from "react-native";
import AppState from '../../context/AppContext';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Teams = () => {
    const { verifyAdminToken } = useContext(AppState)
    const [teams, setTeams] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();
    
    const fetchTeams = async () => {
        try{
            const response = await axios.get('http://10.0.0.128:8000/teams');
            setTeams(response.data);
        } catch(error){
            console.log("Error fetching teams data", error)
        }
    }

    useEffect (()=> {
        verifyAdminToken();
        fetchTeams();
    },[])


    return (
        <View style={styles.container}>
             <View style={styles.header}>
                
                <View style={styles.searchContainer}>
                    <Ionicons name='search' size={20} color='black' />
                    <TextInput
                        style={styles.input}
                        placeholder=' Search'
                        value={searchInput}
                        onChangeText={(text) => setSearchInput(text)}
                    />
                </View>
                
            </View>
            {teams.length > 0 && 
            <View>
                <FlatList 
                    data={teams}
                    horizontal={false}
                    renderItem={({item}) => {
                        if(item?.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return (
                                <Pressable 
                                    style={styles.teamContainer}
                                    key={item._id}
                                    // onPress={() => router.push({
                                    //     pathname:"/updateUser",
                                    //     params: {
                                    //         name: item.name
                                    //     }
                                    // })}
                                    >
                                    <View>
                                        <Text style={styles.text}>{item.name}</Text>   
                                    </View>
                                </Pressable>
                            )
                        }
                    }}
                />
            </View>}
            <Pressable style={styles.button} onPress={() => router.push('(app)/addTeam')}>
                <Text style={styles.buttonText}>Add Team</Text>
            </Pressable>
        </View>
    ) 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#E3E3E3'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#d9dbda',
        borderRadius: 10
    },
    input: {
        fontSize: 15
    },
    teamContainer: {
        flexDirection: 'row',
        margin: 10,
        marginLeft: 10,
        gap: 20,
        backgroundColor: '#BABABA',
        padding: 10,
        borderRadius: 20
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

export default Teams;