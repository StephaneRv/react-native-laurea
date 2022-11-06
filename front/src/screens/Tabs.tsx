import styled from 'styled-components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AboutScreen from "../tabs/About";
import HomeScreen from "../tabs/Home";

const Tab = createBottomTabNavigator();

export default function TabsScreen({ navigation }) {
  return (
    <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'planet'
                : 'planet-outline';
            } else if (route.name === 'About') {
              iconName = focused
                ? 'infinite'
                : 'infinite-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6A38A9',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })
      }
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
  );
}

const VideoView = styled.View`
  background-color: #fff;
`;

const FirstView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  `;

const Logo = styled.Image`
  margin-bottom: 20px;
  width: 200px;
  height: 200px;
`;