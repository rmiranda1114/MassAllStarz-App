import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Agenda from './agenda';
import AddAgendaButton from './addButton';


const ScheduleComponent = ({ props }) => {
    const [selectTeam, setSelectTeam] = useState(props.user.team.length > 0 ? props.user.team[0]._id : "");

    return (
        <View style={styles.container}>
             <Calendar
                minDate={moment().format('YYYY-MM-DD')}
                maxDate={'2024-12-31'}
            />
            {selectTeam ? <ScrollView persistentScrollbar={true} >
                {props.user.team.length > 1 && <View style={styles.buttonContainer}>
                    {props.user.team.map((item) => (
                        <Pressable
                            key={item._id}
                            style={[selectTeam == item._id ? styles.selectedButton : styles.unselectedButton, styles.teamButton]}
                            onPress={() => { setSelectTeam(item._id) }}
                        >
                            <Text style={styles.text}>{item.name}</Text>
                        </Pressable>
                    ))}
                </View>}
                <View>
                    <Agenda props={{ team: selectTeam}} />
                </View>
                {props.user.coach && <AddAgendaButton />}          
            </ScrollView> : <Text>No Team Assigned</Text>}
        </View>  
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        backgroundColor: '#E0E0E1'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
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
    }
});

export default ScheduleComponent;