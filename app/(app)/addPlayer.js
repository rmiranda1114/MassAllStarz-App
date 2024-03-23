import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import AppState from '../../context/AppContext';
import axios from '../../axios/axios'

const addPlayer = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { user } = useContext(AppState);
    const [playerName, setPlayerName] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");
    const [playerNumber, setPlayerNumber] = useState("");
    const [playerTeam, setPlayerTeam] = useState(params.team);
    const [teamData, setTeamData] = useState([]);


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

    const handleAddPlayer = () => {
        const playerData = {
            playerName,
            playerPosition,
            playerNumber,
            playerTeam
        };

        axios.post('/players/add', playerData)
            .then((response) => {
                Alert.alert("Successful", "You have added a player");
                setPlayerName("");
                setPlayerPosition("");
                setPlayerNumber("");
                setPlayerTeam("");
                router.replace('(app)/players')
            }).catch((error) => {
                Alert.alert("Failed", "Error adding player");
                console.log("Add player failed", error)
            });

    }

    useEffect(() => {
        fetchTeams();
    }, [])

    return (
        <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={styles.container}>
                <Text style={styles.header}>Add a Player</Text>
                <TextInput
                    value={playerName}
                    onChangeText={(text) => setPlayerName(text)}
                    style={styles.textInput}
                    placeholder="Player Name"
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>Player Position</Text>
                <TextInput
                    value={playerPosition}
                    onChangeText={(text) => setPlayerPosition(text)}
                    style={styles.textInput}
                    placeholder="Player Position"
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>Player Number</Text>
                <TextInput
                    value={playerNumber}
                    onChangeText={(text) => setPlayerNumber(text)}
                    style={styles.textInput}
                    placeholder="Player Number"
                    keyboardType="numeric"
                />
            </View>
            {user.admin && teamData && <View style={styles.container}>
                <Text style={styles.header}>Team: </Text>
                <Dropdown
                    style={styles.dropdown}
                    data={teamData}
                    placeholder='Select One'
                    labelField='label'
                    valueField='value'
                    value={playerTeam}
                    onChange={item => setPlayerTeam(item.value)}
                />
            </View>}

            <Pressable
                style={styles.button}
                onPress={handleAddPlayer}
            >
                <Text>Add Player</Text>
            </Pressable>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 30
    },
    header: {
        fontSize: 17,
        fontWeight: "bold"
    },
    textInput: {
        padding: 10,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})

export default addPlayer;