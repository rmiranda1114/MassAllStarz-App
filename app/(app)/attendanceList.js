import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import AppState from '../../context/AppContext';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';

const attendanceList = () => {
    const { user } = useContext(AppState);
    const [currentDate, setCurrentDate] = useState(moment());
    const [players, setPlayers] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [selectTeam, setSelectTeam] = useState(user.team[0]);
    const router = useRouter();

    const goToNextDay = ()=> {
        const nextDate = moment(currentDate.add(1, "days"));
        setCurrentDate(nextDate);
    }
    const goToPrevDay = ()=> {
        const prevDate = moment(currentDate.subtract(1, "days"));
        setCurrentDate(prevDate);
    }
    const formatDate = (date) => {
        return date.format("MMMM D, YYYY")
    };
   
    const fetchPlayers = async () => {
        try{
            const response = await axios.post('http://10.0.0.128:8000/players/byTeam', { playerTeam: selectTeam._id });
            setPlayers(response.data);
        } catch(error){
            console.log("Error fetching player data", error)
        }
    };

    const fetchAttendanceData = async () => {
        try{
            const response = await axios.get('http://10.0.0.128:8000/attendance', {
                params: {
                    date: currentDate.format("MMMM D, YYYY")
                }
            });
            setAttendance(response.data);
        } catch(error){
            console.log("Error fetching attendance data", error)
        }
    }

    useEffect (()=> {
        fetchPlayers();
    },[selectTeam])

    useEffect(() => {
        fetchAttendanceData();
    },[currentDate])

    const playerDataWithAttendance = players.map((player) => {
        const attendanceRecord = attendance.find((record) => record.playerName == player.playerName);
        return {
            ...player,
            status: attendanceRecord ? attendanceRecord.status : ""
        };
    });

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{selectTeam.name} Attendance List</Text>
            
            <View style={styles.header}>
                <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
                <Text>{formatDate(currentDate)}</Text>
                <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
            </View>

            <View>
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
            </View>

            <View>
                {playerDataWithAttendance.map((item) => (
                    <Pressable
                        onPress={() => router.push({
                            pathname:"/markAttendance",
                            params: {
                                name: item.playerName,
                                number: item.playerNumber,
                                position: item.playerPosition,
                                _id: item._id,
                                team: item.team
                            }
                        })}
                        key={item._id}
                        style={styles.playerCard}>
                        <View style={styles.block}>
                            <Text style={styles.blockText}>{item.playerNumber}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.text}>{item.playerName}</Text>
                            <Text>{item.playerPosition}</Text>
                        </View>
                        {item.status && <AntDesign  name="check" size={24} color="green" />}
                    </Pressable>
                ))}
            </View>
          
        </View>
      )
}
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: "white"
    },
    headerText: {
        fontSize: 24,
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 20

    },
    playerCard: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        gap: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10, 
        backgroundColor: '#E5E5E5',
        alignItems: 'center'
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

export default attendanceList;



