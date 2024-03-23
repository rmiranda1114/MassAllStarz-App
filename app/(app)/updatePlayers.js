import React, { useState, useEffect, useContext } from 'react'
import { Text, StyleSheet, View, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import AppState from '../../context/AppContext';
import axios from '../../axios/axios'

const updatePlayer = () => {
    const { verifyAdminToken } = useContext(AppState);
    const params = useLocalSearchParams();
    const router = useRouter();
    const [playerData, setPlayerData] = useState();
    const [teamData, setTeamData] = useState();


    const fetchPlayer = async () => {
        try {
            const response = await axios.post('/players', { playerId: params._id });

            setPlayerData(response.data);
        } catch (error) {
            console.log("Error fetching user data", error)
        }
    }

    const fetchTeams = async () => {
        try {
            const response = await axios.get('/teams');
            let teamsArray = [];
            for (let i = 0; i < response.data.length; i++) {
                teamsArray.push({
                    value: response.data[i]._id,
                    label: response.data[i].name
                })
            }
            setTeamData(teamsArray);
        } catch (error) {
            console.log("Error fetching user data", error)
        }
    };

    const updatePlayer = async () => {
        const updated = {
            playerId: playerData._id,
            playerName: playerData.playerName,
            playerPosition: playerData.playerPosition,
            playerNumber: playerData.playerNumber,
            team: playerData.team._id
        }

        try {
            const response = await axios.post('/players/update', updated);
            if (response.status == 200) {
                Alert.alert('Player has been updated');
                router.replace('(app)/playersAll');
            }
        } catch (error) {
            console.log("Error updating player data", error)
        }
    };

    const deletePlayer = async () => {
        try {
            const response = await axios.post('/players/delete', { player: playerData._id });;
            Alert.alert("Player has been deleted");
            router.replace('(app)/playersAll');
        } catch (error) {
            console.log("Error deleting player data", error)
        }
    }

    const createAlert = () => {
        Alert.alert(
            "Delete Player:",
            'Are you sure you want to delete this player?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePlayer(),
                    style: 'default'
                }
            ],
            {
                cancelable: true
            }
            )
    }

    useEffect(() => {
        verifyAdminToken();
        fetchPlayer();
        fetchTeams();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {playerData && teamData ? (
                <View style={styles.userContainer}>
                    <View style={styles.section}>
                        <Text>Player Name</Text>
                        <TextInput
                            value={playerData.playerName}
                            onChangeText={(text) => setPlayerData({ ...playerData, playerName: text  })}
                            style={styles.textInput} 
                            placeholder="Player Name"
                        />
                    </View>
                    <View style={styles.section}>
                        <Text>Player Position</Text>
                        <TextInput
                            value={playerData.playerPosition}
                            onChangeText={(text) => setPlayerData({ ...playerData, playerPosition: text  })}
                            style={styles.textInput} 
                            placeholder="Player Position"
                        />
                    </View>
                    <View style={styles.section}>
                        <Text>Player Number</Text>
                        <TextInput
                            value={playerData.playerNumber}
                            onChangeText={(text) => setPlayerData({ ...playerData, playerNumber: text  })}
                            style={styles.textInput} 
                            placeholder="Player Number"
                        />
                    </View>
                    
                    
                    <View style={styles.section}>
                        <View style={{}}>
                            <Text>Team: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={teamData}
                                placeholder='Select One'
                                labelField='label'
                                valueField='value'
                                value={playerData.team._id}
                                onChange={(item) => {
                                    setPlayerData({ ...playerData, team: { _id: item.value, name: item.name }  });
                                }}
                            />
                        </View>
                    </View>
                </View>) : (<View><Text>Loading Player....</Text></View>
            )}
            <Pressable
                style={styles.button}
                onPress={() => updatePlayer()}
            >
                <Text style={styles.buttonText}>Update Player</Text>
            </Pressable>
            <Pressable
                    style={styles.deleteButton}
                    onPress={() => createAlert()}>
                        <Text>Delete Player</Text>
                </Pressable>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
    marginTop: 30
},
userContainer: {
    marginHorizontal: 15,
marginVertical: 10,
gap: 20,
backgroundColor: '#BABABA',
padding: 20,
borderRadius: 20
},
section: {
    backgroundColor: '#d5d5d5',
    padding: 5,
    borderRadius: 5
},
text: {
    fontSize: 20,
fontWeight: 'bold'
},
textInput: {
    padding: 10,
    borderColor:"#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    borderColor: 'black'
},
dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
},
button: {
    padding: 10,
    backgroundColor:'#9BDBFA',
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 15,
    borderRadius: 8
},
buttonText: {
    textAlign: 'center',
    fontWeight: '500'
},
deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
}
})

export default updatePlayer;
