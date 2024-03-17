import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Attendance from '../../components/team/attendance';
import axios from 'axios';

const Player = ({ props }) => {
    const [playerArray, setPlayerArray] = useState([]);


    const fetchPlayer = async () => {    
        try {
            const response = await axios.post('http://10.0.0.128:8000/players/player', {player: props.user.player});
            setPlayerArray(response.data);
        } catch (error) {
            console.log("Error fetching player data", error)
        }
    }

    useEffect(() => {
        fetchPlayer();
    },[props.user])

    return (
        <ScrollView>        
            {playerArray.length > 0 ?
                <View>
                    {playerArray.map((item) => (
                        <View key={item._id}>
                            <Pressable style={styles.container}>
                                <View style={styles.block}>
                                    <Text style={styles.blockText}>{item.playerNumber}</Text>
                                </View>
                                <View>
                                    <Text style={styles.textPlayer}>{item.playerName}</Text>
                                    <Text>{item.playerPosition}</Text>
                                </View>
                            </Pressable>
                            <Attendance props={{ playerName: item.playerName }} />
                        </View>
                    ))}
                </View> : <View><Text>No Player Information</Text></View>
            }   
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 30,
        marginLeft: 10,
        gap: 20
    },
    block: {
        width: 50,
        height: 50,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#4b6cb7",
        alignplayers: 'center',
        justifyContent: 'center'
    },
    blockText: {
        textAlign: 'center',
        color: 'white'
    },
    textPlayer: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default Player;