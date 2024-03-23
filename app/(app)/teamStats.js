import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import AppState from '../../context/AppContext';
import axios from '../../axios/axios'

const TeamStats = () => {
    const { user } = useContext(AppState);
    const router = useRouter();
    const [teamData, setTeamData] = useState();
    const [selectTeam, setSelectTeam] = useState(user.team[0]);
   
    const getTeamInfo = async () => {
        try{
            const response = await axios.post('/teams/team', {team: selectTeam._id});
            
            setTeamData(response.data);
        } catch(error){
            console.log("Error fetching team data", error)
        }
    }

    const updateTeam = async () => {  
        try{
            const response = await axios.post('/teams/update', {teamData});
            if ( response.status == 201) {
                Alert.alert('Team has been updated');
                router.replace('(app)/(drawer)/(tabs)/team');
            }
        } catch(error){
            console.log("Error updating team data", error)
        }
    }

    const handleMinus = (counter) => {
        if(counter == 0){
            return 0;
        } else {
            return counter - 1;
        }
    }

    const handlePlus = (counter) => {
        return counter + 1;
    }

    useEffect(() => {
        getTeamInfo();
    }, [selectTeam])
   

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>{selectTeam.name} Stats</Text>
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
   
        {teamData && <View>
            <View style={styles.itemContainer}>
                <View>
                    <Text>Wins:</Text>
                    <View style={styles.item}>
                        <AntDesign name="minuscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, wins: handleMinus(teamData.wins) })}/>
                        <Text style={styles.text}>{teamData.wins}</Text>
                        <AntDesign name="pluscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, wins: handlePlus(teamData.wins) })}/>
                    </View>
                </View>                        
                <View style={{}}>
                    <Text>Losses: </Text>
                    <View style={styles.item}>
                        <AntDesign name="minuscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, losses: handleMinus(teamData.losses) })}/>
                        <Text style={styles.text}>{teamData.losses}</Text>
                        <AntDesign name="pluscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, losses: handlePlus(teamData.losses) })}/>
                    </View>                        
                </View>
                <View style={{}}>
                    <Text>Ties: </Text>
                    <View style={styles.item}>
                        <AntDesign name="minuscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, ties: handleMinus(teamData.ties) })}/>
                        <Text style={styles.text}>{teamData.ties}</Text>
                        <AntDesign name="pluscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, ties: handlePlus(teamData.ties) })}/>
                    </View>                            
                </View>
                <View style={{}}>
                    <Text>Goals: </Text>
                    <View style={styles.item}>
                        <AntDesign name="minuscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, goals: handleMinus(teamData.goals) })} />
                        <Text style={styles.text}>{teamData.goals}</Text>
                        <AntDesign name="pluscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, goals: handlePlus(teamData.goals) })}/>
                    </View>
                </View>
                <View style={{}}>
                    <Text>Goals Against: </Text>
                    <View style={styles.item}>
                        <AntDesign name="minuscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, goalsAgainst: handleMinus(teamData.goalsAgainst) })}/>
                        <Text style={styles.text}>{teamData.goalsAgainst}</Text>
                        <AntDesign name="pluscircleo" size={24} color="black" onPress={() => setTeamData({...teamData, goalsAgainst: handlePlus(teamData.goalsAgainst) })}/>
                    </View>
                </View>
            </View>
            <Pressable
                style={styles.button}
                onPress={() => updateTeam()}
            >
                <Text style={styles.buttonText}>Update Team</Text>
            </Pressable>
            </View>}        
            
        </ScrollView>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center'
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
    itemContainer: {
        marginHorizontal: 15,
        marginVertical: 10,
        gap: 20,
        backgroundColor: '#BABABA',
        padding: 20,
        borderRadius: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#CECECE',
        alignItems: 'center'
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

export default TeamStats;
