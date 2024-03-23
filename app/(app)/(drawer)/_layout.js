import React, { useContext } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useRouter } from "expo-router";
import { Alert } from "react-native";
import AppState from '../../../context/AppContext';

const CustomDrawerContent = (props) => {
    const { user, setUser } = useContext(AppState);
    const navigation = useNavigation();
    const router = useRouter();

    return(
        <DrawerContentScrollView {...props}>
            <DrawerItem label={'Home'} onPress={() => router.push('(app)/(drawer)/(tabs)')}/>
            <DrawerItem label={'Schedule'} onPress={() => router.push('(app)/(drawer)/(tabs)/schedule')}/>
            <DrawerItem label={'Team Attendance'} onPress={() => router.push('(app)/(drawer)/(tabs)/team')}/>
            {user.admin && <DrawerItem label={'Users'} onPress={() => router.push('(app)/users')}/>}
            {user.admin && <DrawerItem label={'Teams'} onPress={() => router.push('(app)/teams')}/>}
            {user.admin && <DrawerItem label={'Players'} onPress={() => router.push('(app)/playersAll')}/>}
            <DrawerItem label={'Profile'} onPress={() => router.push('(app)/profile')}/>
            <DrawerItem 
                label={'Signout'}
                onPress={() => {
                    setUser({});
                    SecureStore.deleteItemAsync('Token');
                    Alert.alert("You have been Logged Out");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: '(auth)'}]
                    })

                }}
            />
        </DrawerContentScrollView>
    )
    
}

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{headerShown: false}}
        />
    )
}
