import { Stack } from "expo-router"


const coachLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(drawer)" options={{ title: 'Players'}} />
            <Stack.Screen name="players" options={{}} />
            <Stack.Screen name="attendanceList" options={{}} />
            <Stack.Screen name="addPlayer" options={{}} />
            <Stack.Screen name="markAttendance" options={{}} />
            <Stack.Screen name="report" options={{}} />
            <Stack.Screen name="agenda" options={{}} />
            <Stack.Screen name="users" options={{}} />
            <Stack.Screen name="updateUser" options={{}} />
            <Stack.Screen name="teams" options={{}} />
            <Stack.Screen name="addTeam" options={{}} />
            <Stack.Screen name="teamStats" options={{}} />
            <Stack.Screen name="myPlayer" options={{}} />
            <Stack.Screen name="myTeam" options={{}} />
            <Stack.Screen name="profile" options={{}} />
        </Stack>
    )
};

export default coachLayout;