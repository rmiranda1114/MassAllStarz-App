import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from "react-native";
import AppState from '../../context/AppContext';
import { useRouter } from 'expo-router';
import axios from '../../axios/axios'
import { Ionicons } from '@expo/vector-icons';

const Users = () => {
    const { verifyAdminToken } = useContext(AppState);
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();
 
    const fetchUsers = async () => {
        try{
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch(error){
            console.log("Error fetching users data", error)
        }
    }

    useEffect (()=> {
        verifyAdminToken();
        fetchUsers();
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
            {users.length > 0 && 
            <View>
                <FlatList 
                    data={users}
                    horizontal={false}
                    renderItem={({item}) => {
                        if(item?.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return (
                                <Pressable 
                                    style={styles.userContainer}
                                    key={item._id}
                                    onPress={() => router.push({
                                        pathname:"/updateUser",
                                        params: {
                                            name: item.name
                                        }
                                    })}>
                                    <View>
                                        <Text style={styles.text}>{item.name}</Text>
                                        <Text>Email: {item.email}</Text>
                                        <Text>Coach: {item.coach ? 'Yes' : 'No'}</Text>
                                        <Text>Admin: {item.admin ? 'Yes' : 'No'}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text>Team: </Text>
                                            {item.team.map((team) => <View key={team._id}><Text>{`${team.name} `}</Text></View>)}
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text>Player: </Text>
                                            {item.player.map((player) => <View key={player._id}><Text>{`${player.playerName} `}</Text></View>)}
                                        </View>   
                                    </View>
                                </Pressable>
                            )
                        }
                    }}
                />
            </View>}
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
    userContainer: {
        flexDirection: 'row',
        margin: 10,
        marginLeft: 10,
        gap: 20,
        backgroundColor: '#BABABA',
        padding: 10,
        borderRadius: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    block: {
        width: 50,
        height: 50,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#4b6cb7",
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default Users;