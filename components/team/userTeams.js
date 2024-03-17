import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import axios from 'axios';

const UserTeams = ({ props }) => {
    const [teamData, setTeamData] = useState();

    const getTeamInfo = async () => {
        try {
            const response = await axios.post('http://10.0.0.128:8000/teams/team', { team: props.team });
            setTeamData(response.data);
        } catch (error) {
            console.log("Error fetching team data", error)
        }
    }
 

    useEffect(() => {
        getTeamInfo();
    }, [props.team]);

    return (
        <>
            {teamData && <View style={styles.itemContainer}>
                <View style={styles.item}>
                    <View>
                        <Text>Wins:</Text>
                        <View style={styles.item}>
                            <Text style={styles.text}>{teamData.wins}</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text>Losses: </Text>
                        <View style={styles.item}>
                            <Text style={styles.text}>{teamData.losses}</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text>Ties: </Text>
                        <View style={styles.item}>
                            <Text style={styles.text}>{teamData.ties}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{}}>
                        <Text>Goals: </Text>
                        <View style={styles.item}>
                            <Text style={styles.text}>{teamData.goals}</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text>Goals Against: </Text>
                        <View style={styles.item}>
                            <Text style={styles.text}>{teamData.goalsAgainst}</Text>
                        </View>
                    </View>
                </View>
            </View>} 
        </>
          
    )
  
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 15,
        marginTop: 50,
        gap: 20,
        backgroundColor: '#BABABA',
        padding: 20,
        borderRadius: 20
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#CECECE',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

})

export default UserTeams;