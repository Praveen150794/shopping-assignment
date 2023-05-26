import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CartScreen from "../screens/CartScreen/CartScreen";

export const RootNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="BottomTabNavigator"
                    component={BottomTabNavigator}
                />
                <Stack.Screen name="CartScreen" component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
