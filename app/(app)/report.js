import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable } from 'react-native';
import AppState from '../../context/AppContext';
import axios from 'axios';
import { DataTable } from 'react-native-paper';

const Report = () => {
    const { user } = useContext(AppState);
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectTeam, setSelectTeam] = useState(user.team[0])

    const fetchAttendanceReport = async () => {
        try{
            const response = await axios.post('http://10.0.0.128:8000/attendance/byTeam', {team: selectTeam._id});
            setAttendanceData(response.data.report)
        }catch(error) {
            console.log('Error fetching attendance data', error)
        }
    }

    useEffect(() => {
        fetchAttendanceReport()
    }, [selectTeam]);
    
    return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.header}>Attendance Report</Text>
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
            {attendanceData.map((item) => (
                <View key={item.key}>
                    <View style={styles.playerCard}>
                        <View style={styles.block}>
                            <Text style={styles.blockText}>{item.playerNumber}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.text}>{item.playerName}</Text>
                            <Text>{item.playerPosition}</Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Present</DataTable.Title>
                                <DataTable.Title>Absent</DataTable.Title>
                                <DataTable.Title>Late</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>{item.present}</DataTable.Cell>
                                <DataTable.Cell>{item.absent}</DataTable.Cell>
                                <DataTable.Cell>{item.late}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    </View>
                </View>
            ))}
        </View>
      </ScrollView>
    )
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        textDecorationLine: 'underline',
        marginVertical: 10
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
    playerCard: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        gap: 20
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
    },
    table: {
        marginHorizontal: 30,
        padding: 5,
        backgroundColor: '#C2D1C5',
        borderRadius: 5
    }
})

export default Report;
