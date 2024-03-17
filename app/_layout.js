import { Stack } from "expo-router";
import { AppProvider } from "../context/AppContext";
import { SafeAreaView, StatusBar } from "react-native";


const userLayout = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <AppProvider>
                <StatusBar barStyle='dark-content' />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" options={{}} />
                    <Stack.Screen name="(app)" options={{}} />
                </Stack>
            </AppProvider>
        </SafeAreaView>
        
        
    )
};

export default userLayout;