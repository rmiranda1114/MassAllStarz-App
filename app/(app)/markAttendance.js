import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import axios from '../../axios/axios'
import { AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';

const markAttendance =() => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [attendanceStatus, setAttendanceStatus] = useState(('present'));
    const params = useLocalSearchParams();
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
    }

    const submitAttendance = async() => {
        
        try{
            const attendanceData = {
                playerName: params.name,
                team: params.team,
                status: attendanceStatus,
                date: currentDate.format("MMMM D, YYYY")
            }
            const response = await axios.post('/attendance', attendanceData );
            if (response.status === 200){
                Alert.alert(`Attendance submitted for ${params.name}`)
                router.replace('(app)/attendanceList')
            }
        } catch(error) {
            console.log('error submitting attendance', error)
        }
    }

    return (
        <View>
            <View style={styles.header}>
                <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
                <Text>{formatDate(currentDate)}</Text>
                <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
            </View>

            <Pressable style={styles.container}>
                <View style={styles.block}>
                    <Text style={styles.blockText}>{params.number}</Text>
                </View>
                <View>
                    <Text style={styles.text}>{params.name}</Text>
                    <Text>{params.position}</Text>
                </View>
            </Pressable>
            <View style={styles.cardContainer}>
                <Pressable style={styles.card} onPress={() => setAttendanceStatus('present')}>
                    {attendanceStatus === 'present' ? (
                        <FontAwesome5 name="dot-circle" size={24} color='black' />
                    ) : (
                        <Entypo name='circle' size={24} color='black' />
                    )}
                    <Text>Present</Text>
                </Pressable>
                <Pressable style={styles.card} onPress={() => setAttendanceStatus('absent')}>
                    {attendanceStatus === 'absent' ? (
                        <FontAwesome5 name="dot-circle" size={24} color='black' />
                    ) : (
                        <Entypo name='circle' size={24} color='black' />
                    )}
                    <Text>Absent</Text>
                </Pressable>
                <Pressable style={styles.card} onPress={() => setAttendanceStatus('late')}>
                    {attendanceStatus === 'late' ? (
                        <FontAwesome5 name="dot-circle" size={24} color='black' />
                    ) : (
                        <Entypo name='circle' size={24} color='black' />
                    )}
                    <Text>Late</Text>
                </Pressable>
            </View>
            <Pressable style={styles.button} onPress={submitAttendance}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 12,
        flexDirection: 'row',
        gap: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 20

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
    cardContainer: {
        alignItems: 'center',
        gap: 16,
        margin: 10,
        flexDirection: 'row'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#C4E0E5',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        gap: 10,
        flex: 1
    },
    button: {
        padding: 10,
        backgroundColor:'red',
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        borderRadius: 8
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500'
    }
})

export default markAttendance;
