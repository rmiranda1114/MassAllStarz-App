import { Stack } from "expo-router";


const RootLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="register" options={{}} />
        </Stack>     
    )
};

export default RootLayout;