import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Player from '../../components/player/userPlayer';

const MyPlayer = () => {
    const { user } = useContext(AppContext);

    return(
        <SafeAreaView>
            <Player props={{ user: user }} /> 
        </SafeAreaView>
    )
}

export default MyPlayer