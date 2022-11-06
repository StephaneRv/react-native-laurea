import styled from 'styled-components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AboutScreen from "../tabs/About";
import Search from "../tabs/Search";
import TrendingVideos from '../components/TrendingVids';

const Tab = createBottomTabNavigator();

export default function TabsScreen({ navigation }) {
  return (
    <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Trends') {
              iconName = focused
                ? 'planet'
                : 'planet-outline';
            } else if (route.name === 'Search') {
              iconName = focused
                ? 'search'
                : 'search-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6A38A9',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })
      }
      >
        <Tab.Screen name="Trends" component={TrendingVideos} />
        <Tab.Screen name="Search" component={Search}/>
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