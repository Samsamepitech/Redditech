import * as React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, FlatList, StyleSheet, Image, Modal, Pressable, Alert, TouchableOpacity } from "react-native";
import SubPosts from './Posts/SubPosts';
import Filters from '../components/Filters';



export default function  PopularSubs (props: any) {

    const [populars, setPopular] = useState<Array<String>>([]);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const getPopular= async(props:any) => {

          let token = await AsyncStorage.getItem('access_token');
            fetch('https://oauth.reddit.com/subreddits/popular',{
              method: 'GET',
              mode: 'cors',
              redirect: 'follow',
              headers: {
                'Authorization': 'Bearer ' + token,
            },
            })
            .then(response => response.json())
            .then(result => setPopular(result.data.children))
            .catch(error => console.log('error', error));

        }
        getPopular(props)
        console.log(populars);
        }, []);

        return (
            <>
               <View>

             {populars.map((popular: any) => { return (
               <View>
                   <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.container} >
                      <Text style={styles.name}> {popular.data.title}</Text>
                    </View>
                    </TouchableOpacity>
                     <Modal
                     animationType="slide"
                     transparent={false}
                     visible={modalVisible}
                     onRequestClose={() => {
                       Alert.alert("Modal has been closed.");
                       setModalVisible(!modalVisible);
                     }}
                   >
                     <View style={styles.centeredView}>
                      <View style={styles.modalView}>

                 <Pressable
                 style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                 >
                <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
                </View>
              <Filters />
             <SubPosts/>
            </View>
            </Modal>
            </View>
             )})}

              </View>
             </>
           );
             }


         const styles = StyleSheet.create({
           container:{
             height: 'auto',
             backgroundColor: 'white',
             borderBottomColor: 'gray',
             border: 'gray 1px solid',
             borderRadius: 50,
             margin: '.5em',
             width: 'fit-content',
             padding: '.5em',

           },
           name: {
             fontSize: 28,
             color: 'black',
             fontWeight: '600',
             textAlign: 'left',
           },
           centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            shadowColor: 'black',
            shadowRadius: 5,
          },
          buttonOpen: {
            backgroundColor: "#CACACA",
            margin: '1em',
            width: '30%',
            alignSelf: 'center'
          },
          buttonClose: {
            backgroundColor: "#2196F3",
          },
          textStyle: {
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            textShadowColor: 'white',
            textShadowRadius: 4
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          }

           });