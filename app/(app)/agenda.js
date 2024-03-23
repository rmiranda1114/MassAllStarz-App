import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Pressable, Alert } from 'react-native';
import { useRouter } from "expo-router";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import AppState from '../../context/AppContext';
import moment from 'moment';
import axios from '../../axios/axios'

const Agenda = ()=> {
    const { user } = useContext(AppState);
    const router = useRouter();
    const [description, setDescription] = useState();
    const [date, setDate] = useState(moment());
    const [type, setType] = useState("practice");
    const [inputTeam, setInputTeam] = useState();
    const [datePicker, setDatePicker] = useState(false);
    const [teamData, setTeamData] = useState([]);
    

    const TeamArray = () => {
        let myArray = []
        for(let i = 0; i < user.team.length; i++) {
            myArray.push({ value: user.team[i]._id, label: user.team[i].name })
        }
        setTeamData(myArray);
    }



    const newAgenda = async ()=> {
        const agendaData = {
            date,
            type, 
            description,
            team: inputTeam
        }
        try{
            const response = await axios.post('/agenda', agendaData);
            if(response.status == 200) {
                Alert.alert("New Date has been added");
                router.push("(app)/(tabs)/schedule");
            }
           
        } catch(error){
            console.log("Unable to add new Agenda", error)
        }
    };

    const formatDate = (date) => {
        return moment(date).format("YYYY-MM-DD")
    };

    const handleConfirm = (date) => {
        formatDate(date);
        setDate(date);
        setDatePicker(false);
    }

    useEffect(() => {
        TeamArray();
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.header}>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    style={styles.textInput} 
                    placeholder="Practice 5:30pm"
                />
            </View>
            <View style={styles.descriptionContainer}>
                <Text>{formatDate(date)}</Text>
                <Button title="Select Date" onPress={() => setDatePicker(true)} />
                <DateTimePickerModal 
                    isVisible = {datePicker}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePicker(false)}
                />
            </View>
            <View style={styles.radioContainer}>
                <Pressable style={styles.card} onPress={() => setType('practice')}>
                    {type === 'practice' ? (
                        <FontAwesome5 name="dot-circle" size={24} color='black' />
                    ) : (
                        <Entypo name='circle' size={24} color='black' />
                    )}
                    <Text>Practice</Text>
                </Pressable>
                <Pressable style={styles.card} onPress={() => setType('game')}>
                    {type === 'game' ? (
                        <FontAwesome5 name="dot-circle" size={24} color='black' />
                    ) : (
                        <Entypo name='circle' size={24} color='black' />
                    )}
                    <Text>Game</Text>
                </Pressable>
                <Pressable style={styles.card} onPress={() => setType('admin')}>
                    {type === 'admin' ? (
                        <FontAwesome5 name="dot-circle" size={24} color='black' />
                    ) : (
                        <Entypo name='circle' size={24} color='black' />
                    )}
                    <Text>Admin</Text>
                </Pressable>
            </View>
            <View style={{}}>
                <Text>Team: </Text>
                <Dropdown
                    style={styles.dropdown}
                    data={teamData}
                    placeholder='Select One'
                    labelField='label'
                    valueField='value'
                    value={inputTeam}
                    onChange={(item) => {
                        setInputTeam(item.value);
                    }}
                />
            </View>

            <Pressable 
                style={styles.button}
                onPress={newAgenda}  
            >
                <Text>Submit</Text>
            </Pressable>
        </View>
    )
  }

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    descriptionContainer: {
        marginVertical: 10
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
        gap: 10,
        padding: 10,
    },
    header: {
        fontSize: 17,
        fontWeight: "bold"
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
    textInput: {
        padding: 10,
        borderColor:"#D0D0D0",
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5
    },
    dropdown: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8
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

export default Agenda
