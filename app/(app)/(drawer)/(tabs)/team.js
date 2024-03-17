import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../../../../context/AppContext';

function Team() {
  const { user } = useContext(AppContext);
  const router = useRouter();
 
  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable 
          onPress={() => router.push("/(app)/myPlayer")}
          style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name='newspaper-outline' size={24} color='black' />
          </View>
          <Text style={styles.title}>My Player</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <Pressable 
          onPress={() => router.push("/(app)/myTeam")}
          style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name='newspaper-outline' size={24} color='black' />
          </View>
          <Text style={styles.title}>My Team</Text>
        </Pressable>
      </View>

      {user.coach && <View style={styles.container}>
        <Pressable 
          style={styles.card}
          onPress={() => router.push("/(app)/players")}
          >
          <View style={styles.icon}>
            <Ionicons name='people-outline' size={24} color='black' />
          </View>
          <Text style={styles.title}>Player List</Text>
        </Pressable>
        <Pressable 
          onPress={() => router.push("/(app)/attendanceList")}
          style={styles.card}
          >
          <View style={styles.icon}>
            <Ionicons name='reader-outline' size={24} color='black' />
          </View>
          <Text style={styles.title}>Attendance</Text>
        </Pressable>
      </View>}

      {user.coach && <View style={styles.container}>
        <Pressable 
          onPress={() => router.push("/(app)/report")}
          style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name='newspaper-outline' size={24} color='black' />
          </View>
          <Text style={styles.title}>Attendance Report</Text>
        </Pressable>
      </View>}
      {user.coach && <View style={styles.container}>
        <Pressable 
          onPress={() => router.push("/(app)/teamStats")}
          style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name="stats-chart" size={24} color="black" />
          </View>
          <Text style={styles.title}>Team Stats</Text>
        </Pressable>
      </View>}
      

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: "center",
    gap: 20
  },
  card: {
    flex: 1,
    backgroundColor: '#4b6cb7',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    marginTop: 7,
    fontWeight: "600"
  }
});

export default Team;