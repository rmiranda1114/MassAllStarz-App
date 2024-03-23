import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import axios from '../../axios/axios'


const Agenda = ({ props }) => {
    const [agenda, setAgenda] = useState([]);

    const getAgenda = async () => {
        try {
            const response = await axios.post('/agenda/get', { date: moment().format('YYYY-MM-DD'), team: props.team });
            setAgenda(response.data);
        } catch (error) {
            console.log("Unable to get Agenda Data", error)
        }
    };

    let sortAgenda = agenda.sort((a,b) => {
        let x = new Date(a.date);
        let y = new Date(b.date);
        if(x < y) return -1;
        if(x > y) return 1;
        return 0;
    })

    useEffect(() => {
        getAgenda()
    }, [props.team]);

    return (     
        <>
            {agenda && <View>
                {sortAgenda.map((item) => ( 
                    <View key={item._id}>
                        <View style={styles.agendaCard}>
                            <Text style={styles.cardHeader}>{moment(item.date).format('dddd, MMMM Do')}</Text>
                            <Text style={styles.cardText}>{item.description}</Text>
                        </View>
                    </View>    
                ))}
            </View>}
        </>  
    )            
               
}

const styles = StyleSheet.create({
    agendaCard: {
        marginTop: 10
    },
    cardHeader: {
        textDecorationLine: 'underline',
        marginLeft: 15
    },
    cardText: {
        marginLeft: 35,
        fontSize: 18,
        fontWeight: '500'
    },
});

export default Agenda;