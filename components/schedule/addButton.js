import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';


const AddAgendaButton = () => {
    const router = useRouter();
  
    return (
        <Pressable style={styles.button} onPress={() => router.push('(app)/agenda')}>
            <Text style={styles.buttonText}>Add New</Text>
        </Pressable>      
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#9BDBFA',
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 15,
        borderRadius: 8
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '500'
    }
});

export default AddAgendaButton;