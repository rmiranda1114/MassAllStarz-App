import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function coachTabLayout() {
    return (
        <Tabs screenOptions={{  }}>
            <Tabs.Screen 
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: () => <Ionicons name='home' size={24} color='black' />,
                    headerShown: false
                    
                }} 
            />
            <Tabs.Screen
                name="schedule"
                options={{
                    title: 'Schedule',
                    tabBarIcon: () => <Ionicons name='calendar' size={24} color='black' />,
                    headerRight: () => (<DrawerToggleButton />),
                    headerTitle: "Upcoming Dates"  
                }} />
            <Tabs.Screen
                name="team"
                options={{
                    title: 'Team',
                    tabBarIcon: () => <Ionicons name='people' size={24} color='black' />,
                    headerRight: () => (<DrawerToggleButton />),
                    headerTitle: "Team Management System"
                }} />
        </Tabs>
    )
}