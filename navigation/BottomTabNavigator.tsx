import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";
import ProductScreen from '../screens/ProductScreen/ProductScreen';

export default function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator()
    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>
            <BottomTab.Screen
                name="Home"
                component={ProductScreen}
                options={{
                    tabBarIcon: () => (
                        <View>
                            <Text>
                                <Ionicons name="home" size={22} color="blue" />
                            </Text>
                        </View>
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}
