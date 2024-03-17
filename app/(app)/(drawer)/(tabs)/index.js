import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AppContext from '../../../../context/AppContext.js';
import Header from "../../../../components/home/Header.js";
import Slider from "../../../../components/home/Slider.js";

const Home = () => {
    const { user } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <Header props={{ name: user.name }} />
            <Slider />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 0,
        justifyContent: "space-evenly"
    },
    text: {
        fontSize: 48
    },
    button: {
        padding: 16,
        backgroundColor: 'blue',
        borderRadius: 90,
        alignItems: 'center',
        marginTop: 20,
        width: Dimensions.get('screen').width*0.8
    },
})

export default Home;