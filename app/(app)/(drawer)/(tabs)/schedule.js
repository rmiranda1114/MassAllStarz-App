import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import AppState from '../../../../context/AppContext';
import ScheduleComponent from '../../../../components/schedule/schedule';


const Schedule = () => {
    const { user } = useContext(AppState);
  
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScheduleComponent props={{user: user}}/>
        </SafeAreaView>
    )
}

export default Schedule;