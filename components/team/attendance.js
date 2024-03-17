import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import axios from 'axios';
import { DataTable } from 'react-native-paper';

const Attendance = ({ props }) => {
    const [attendanceData, setAttendanceData] = useState([]);

    const fetchAttendance = async () => {
        const data = {
            playerName: props.playerName
        }
        try{
            const response = await axios.post('http://10.0.0.128:8000/attendance/player', data);
            setAttendanceData(response.data.report)
            console.log(response.data.report)
        }catch(error) {
            console.log('Error fetching attendance data', error)
        }
    }

    useEffect(() => {
        fetchAttendance()
    }, []);

    return (
        <>
            {attendanceData.length > 0 &&
            <View style={styles.table}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Present</DataTable.Title>
                        <DataTable.Title>Absent</DataTable.Title>
                        <DataTable.Title>Late</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell>{attendanceData[0].present}</DataTable.Cell>
                        <DataTable.Cell>{attendanceData[0].absent}</DataTable.Cell>
                        <DataTable.Cell>{attendanceData[0].late}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>}         
        </>
            
      )
    }
  
  
  const styles = StyleSheet.create({
      container: {
          marginBottom: 20
      },
      header: {
          textAlign: 'center',
          fontSize: 24,
          textDecorationLine: 'underline',
          marginVertical: 10
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
          alignattendanceDatas: 'center',
          justifyContent: 'center'
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
  
  export default Attendance;
  