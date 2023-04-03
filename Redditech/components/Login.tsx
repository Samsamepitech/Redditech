import { StyleSheet } from 'react-native';
import React from "react";
import { Stack, Button, Avatar } from "@react-native-material/core";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: 'TstECZY15hIwJOpJf9RpCA',
      scopes: ['*'],
      redirectUri: makeRedirectUri({
        native: 'http://localhost:19006'
        }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log(response.params.access_token);
      console.log(response);
        try {
          AsyncStorage.setItem('access_token', response.params.access_token);
        } catch (error) {
          // Error saving data
        }
      }
  }, [response]);
  return (
    <Stack style={styles.container} fill center spacing={30}>
    <Text style={styles.title} >Welcome on Redditech !</Text>
    <Avatar image={{ uri: "https://cdn-icons.flaticon.com/png/512/3670/premium/3670304.png?token=exp=1652713447~hmac=e9d777c7e9a807fad71fb6bad4f6b75e" }} />
    <Button
      disabled={!request}
      title="Login"
      color="error"
      onPress={() => {
        promptAsync();
        }}
    />
    {/*<Button variant="outlined" title="Register" color="#d4ac2d"/>*/}
  </Stack>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDC9B5'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


  

