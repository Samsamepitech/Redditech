/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import PostModal from '../screens/PostModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Avatar } from "@react-native-material/core";
import PostModalScreen from '../screens/PostModalScreen';
import Filters from '../components/Filters';
import SearchScreen from '../screens/SearchScreen';
import { COLORSTYLE } from '../constants/style.colors';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="TabTwo" component={TabTwoScreen} options={{  }}/>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="PostModal" component={PostModalScreen}/>

      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [User, setUser] = React.useState({name:'', snoovatar_img: ''});


  React.useEffect(() => {
    const getUser= async () => {
      let token = await AsyncStorage.getItem('access_token');
      console.log(token);
        fetch('https://oauth.reddit.com/api/v1/me',{
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer ' + token,
        },
        })
        .then(response => response.json())
        .then(result => setUser(result))
        .catch(error => console.log('error', error));

    }
    getUser()
    console.log([User.name]);
    }, []);
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerStyle: {
            backgroundColor: '#B00256',
          },
        })}
      />
       <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }: RootTabScreenProps<'Search'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerStyle: {
            backgroundColor: '#B00256',

          },
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<'TabTwo'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Avatar image={{uri: User.snoovatar_img}} size={50} style={{ marginRight: 15, borderColor: 'white', borderWidth: 5, borderRadius: 63, }}/>
            </Pressable>
          ),headerStyle: {
            backgroundColor: '#B00256',
          },
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={({ navigation }: RootTabScreenProps<'TabThree'>) => ({
          title: 'Post',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Avatar image={{uri: User.snoovatar_img}} size={30} style={{ marginRight: 15 }}/>
            </Pressable>
          ),headerStyle: {
            backgroundColor: '#B00256',
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

//      <Stack.Screen name="Search" component={Filters} options={({ route, navigation }) => ({ title: route.params.userId})}/>