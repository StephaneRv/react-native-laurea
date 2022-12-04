import styled from 'styled-components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AboutScreen from "../components/About";
import Search from "../tabs/Search";
import TrendingVideos from '../tabs/TrendingVids';
import Account from '../tabs/Account';

const Tab = createBottomTabNavigator();

export default function TabsScreen({ navigation }) {
  return (
    <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Trends') {
              iconName = focused
                ? 'flame'
                : 'flame-outline';
            } else if (route.name === 'Search') {
              iconName = focused
                ? 'search'
                : 'search-outline';
            } else if (route.name === 'Account') {
              iconName = focused
                ? 'person'
                : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#90cea1',
          tabBarInactiveTintColor: '#01b4e4',
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "#0d253f",

          },
        
        })
      }
      >
        <Tab.Screen name="Trends" component={TrendingVideos} />
        <Tab.Screen name="Search" component={Search}/>
        <Tab.Screen name="Account" component={Account}/>
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