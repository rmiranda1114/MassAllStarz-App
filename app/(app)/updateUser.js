import React, { useState, useEffect, useContext } from 'react'
import { Text, StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import AppState from '../../context/AppContext';
import axios from 'axios';

const updateUser = () => {
    const { verifyAdminToken } = useContext(AppState);
    const params = useLocalSearchParams();
    const router = useRouter();
    const [user, setUser] = useState();
    const [teamData, setTeamData] = useState([]);
    const [playerData, setPlayerData] = useState([]);

    const options = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
    ]

    const fetchUser = async () => {
        try {
            const response = await axios.post('http://10.0.0.128:8000/users/user', { name: params.name });

            setUser(response.data);
        } catch (error) {
            console.log("Error fetching user data", error)
        }
    }

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://10.0.0.128:8000/teams');
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

    const fetchPlayers = async (playerTeam) => {
        try {
            const response = await axios.post('http://10.0.0.128:8000/players/byTeam', { playerTeam });
            let playerArray = [];
            for (let i = 0; i < response.data.length; i++) {
                playerArray.push({
                    value: response.data[i]._id,
                    label: response.data[i].playerName
                })
            }
            setPlayerData(playerArray);
        } catch (error) {
            console.log("Error fetching player data", error)
        }
    };

    const updateUser = async () => {
        const updated = {
            email: user.email,
            admin: user.admin,
            coach: user.coach,
            team: user.team,
            player: user.player
        }

        try {
            const response = await axios.post('http://10.0.0.128:8000/users/update', updated);
            if (response.status == 200) {
                Alert.alert('User has been updated');
                router.replace('(app)/users');
            }
        } catch (error) {
            console.log("Error updating user data", error)
        }
    }

    useEffect(() => {
        verifyAdminToken();
        fetchUser();
        fetchTeams();
    }, []);


    return (
        <ScrollView style={styles.container}>
            {user && teamData ? (
                <View style={styles.userContainer}>
                    <View>
                        <Text style={styles.text}>{user?.name}</Text>
                        <Text>Email: {user?.email}</Text>
                    </View>
                    <View style={styles.section}>
                        <View style={{}}>
                            <Text>Coach: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={options}
                                placeholder='Select One'
                                labelField='label'
                                valueField='value'
                                value={user.coach}
                                onChange={item => setUser({ ...user, coach: item.value })}
                            />
                        </View>

                        <View style={{}}>
                            <Text>Admin: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={options}
                                placeholder='Select One'
                                labelField='label'
                                valueField='value'
                                value={user.admin}
                                onChange={item => setUser({ ...user, admin: item.value })}
                            />
                        </View>
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
                                value={user.team[0]}
                                onChange={(item) => {
                                    console.log(item.value);
                                    fetchPlayers(item.value);
                                    setUser({ ...user, team: [item.value] });
                                }}
                            />
                        </View>
                        <View style={{}}>
                            <Text>Player: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={playerData}
                                placeholder='Select One'
                                labelField='label'
                                valueField='value'
                                value={user.player[0]}
                                onChange={item => setUser({ ...user, player: [item.value] })}
                            />
                        </View>
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
                                value={user.team[1]}
                                onChange={(item) => {
                                    fetchPlayers(item.value);
                                    setUser({ ...user, team: [...user.team, item.value] });
                                }}
                            />
                        </View>
                        <View style={{}}>
                            <Text>Player: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={playerData}
                                placeholder='Select One'
                                labelField='label'
                                valueField='value'
                                value={user.player[1]}
                                onChange={item => setUser({ ...user, player: [...user.player, item.value] })}
                            />
                        </View>
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
                                value={user.team[2]}
                                onChange={(item) => {
                                    console.log(item.value);
                                    fetchPlayers(item.value);
                                    setUser({ ...user, team: [...user.team, item.value] });
                                }}
                            />
                        </View>
                        <View style={{}}>
                            <Text>Player: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={playerData}
                                placeholder='Select One'
                                labelField='label'
                                valueField='value'
                                value={user.player[2]}
                                onChange={item => setUser({ ...user, player: [...user.player, item.value] })}
                            />
                        </View>

                    </View>
                </View>) : (<View><Text>Loading User....</Text></View>
            )}
            <Pressable
                style={styles.button}
                onPress={() => updateUser()}
            >
                <Text style={styles.buttonText}>Update User</Text>
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

export default updateUser;
