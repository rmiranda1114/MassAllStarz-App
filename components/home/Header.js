import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

const Header = ({ props }) => {
    const fullName = props.name
    return (
        <View style={[styles.container, styles.header]}>
            <View style={[styles.container, styles.user]}>
                <View>
                    <Image source={require('../../assets/MASLogo.jpg')} style={styles.userImage} />
                </View>
                <View>
                    <Text>Mass All-Starz</Text>
                    <Text style={styles.userName}>{fullName}</Text>
                </View>
            </View>
            <DrawerToggleButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        justifyContent: 'space-between'
    },
    user: {
        gap: 7
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius:99
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default Header;