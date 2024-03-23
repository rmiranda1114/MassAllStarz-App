import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import AppState from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import axios from '../../axios/axios'
import { useRouter } from "expo-router";

const Players = () => {
    const { user } = useContext(AppState);
    const [players, setPlayers] = useState([]);
    const [selectTeam, setSelectTeam] = useState(user.team.length > 0 ? user.team[0] : "");
    const router = useRouter();

    const fetchPlayers = async () => {
        try{
            const response = await axios.post('/players/byTeam', { playerTeam: selectTeam._id });
            setPlayers(response.data);
        } catch(error){
            console.log("Error fetching player data", error)
        }
    }

    useEffect (()=> {
        if(selectTeam) fetchPlayers();
        return;
    },[selectTeam])


    return (
        <>        
            <View style={styles.header}>
                <Pressable onPress={()=> router.push("/(app)/(drawer)/(tabs)/team")}>
                    <Ionicons name="arrow-back" size={30} color="black" />    
                </Pressable>
                <Text style={styles.headerText}>{selectTeam.name} Players List</Text>
                <Pressable onPress={() => {selectTeam && router.push({
                            pathname:"(app)/addPlayer",
                            params: {
                                team: selectTeam._id
                            }
                        })}}>
                    <Ionicons name="add-circle" size={30} color="blue" />
                </Pressable>
                
            </View>      
            {user.team.length > 1 && <View style={styles.buttonContainer}>
                {user.team.map((item) => (
                    <Pressable
                        key={item._id}
                        style={[selectTeam._id == item._id ? styles.selectedButton : styles.unselectedButton, styles.teamButton]}
                        onPress={() => { setSelectTeam(item) }}
                    >
                        <Text style={styles.text}>{item.name}</Text>
                    </Pressable>
                ))}
            </View>}              
            {selectTeam && players ? <FlatList 
                data={players}
                horizontal={false}
                renderItem={({item}) => (
                    <View style={styles.playerContainer}>
                        <View style={styles.block}>
                            <Text style={styles.blockText}>{item.playerNumber}</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>{item.playerName}</Text>
                            <Text>{item.playerPosition}</Text>
                        </View>
                    </View>
                )}
            /> : <Text>No Players Added Yet</Text>}
        </>
    )
};

const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 24
    },
    playerContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginLeft: 10,
        gap: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15
    },
    teamButton: {
        padding: 10,
        width: 120,
        marginVertical: 15,
        borderRadius: 8
    },
    selectedButton: {
        backgroundColor: '#FF4647'
    },
    unselectedButton: {
        backgroundColor: '#D6D5D5'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
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
    blockText: {
        textAlign: 'center',
        color: 'white'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default Players;