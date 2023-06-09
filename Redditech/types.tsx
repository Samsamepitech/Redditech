/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
 import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
 import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
 import { NativeStackScreenProps } from '@react-navigation/native-stack';
 import { IconComponentProvider, Icon } from "@react-native-material/core";
 import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

 declare global {
   namespace ReactNavigation {
     interface RootParamList extends RootStackParamList {}
   }
 }

 export type RootStackParamList = {
   Root: NavigatorScreenParams<RootTabParamList> | undefined;
   Modal: undefined;
   NotFound: undefined;
   PostModal: undefined;
   TabTwo: undefined;
 };

 export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   Screen
 >;

 export type RootTabParamList = {
   TabOne: undefined;
   TabTwo: undefined;
   TabThree: undefined;
   Search: undefined;
 };

 export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
   BottomTabScreenProps<RootTabParamList, Screen>,
   NativeStackScreenProps<RootStackParamList>
 >;