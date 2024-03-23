import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from "react-native";
import AppState from '../../context/AppContext';
import { useRouter } from 'expo-router';
import axios from '../../axios/axios'
import { Ionicons } from '@expo/vector-icons';

const PlayerAll = () => {
    const { verifyAdminToken } = useContext(AppState);
    const [players, setPlayers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();
 
    const fetchPlayers = async () => {
        try{
            const response = await axios.get('/players');
            setPlayers(response.data);
        } catch(error){
            console.log("Error fetching players data", error)
        }
    }

    useEffect (()=> {
        verifyAdminToken();
        fetchPlayers();
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
            {players.length > 0 && 
            <View>
                <FlatList 
                    data={players}
                    horizontal={false}
                    renderItem={({item}) => {
                        if(item?.playerName.toLowerCase().includes(searchInput.toLowerCase())){
                            return (
                                <Pressable 
                                    style={styles.userContainer}
                                    key={item._id}
                                    onPress={() => router.push({
                                        pathname:"/updatePlayers",
                                        params: {
                                            _id: item._id
                                        }
                                    })}>
                                    <View>
                                        <Text style={styles.text}>{item.playerName}</Text>
                                        <Text>Number: {item.playerNumber}</Text>
                                        <Text>Position: {item.playerPosition}</Text>
                                        <Text>Team: {item.team.name}</Text>  
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

export default PlayerAll;