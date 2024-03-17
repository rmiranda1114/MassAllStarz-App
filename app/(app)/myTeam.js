import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from "react-native";
import AppContext from '../../context/AppContext';
import UserTeams from "../../components/team/userTeams";

const MyTeam = () => {
    const { user } = useContext(AppContext);
    const [selectTeam, setSelectTeam] = useState(user.team.length > 0 ? user.team[0] : "");

    return (
        <SafeAreaView>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/MASLogo.jpg')}
                    style={styles.image}
                />
                {selectTeam && <Text style={styles.imageText}>{selectTeam.name}</Text>}
            </View>

            {selectTeam ? <View>
                <UserTeams props={{ team: selectTeam._id}} />
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
            </View> : <Text>No Team Assisgned</Text>}
        </SafeAreaView>
        
    )
};

const styles = StyleSheet.create({
    imageContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50
    },
    image: {
        width: 150,
        height: 150,
        borderRadius:99
    },
    imageText: {
        textAlign: 'center',
        fontSize: 30
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
    }

})

export default MyTeam;