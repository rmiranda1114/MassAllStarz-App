import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 

function Header() {
  return (
    <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Upcoming Dates</Text>
        </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleBar: {
    marginTop: 30
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: 'center'
  }
});

export default Header;