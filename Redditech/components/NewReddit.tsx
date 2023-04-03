import React from "react";
import { Stack, TextInput, Button } from "@react-native-material/core";
import { StyleSheet } from 'react-native';

const NewReddit = () => (
    <Stack spacing={2} style={{ margin: 16 }} >
       <TextInput variant="outlined" label="Title" style={{ margin: 16 }} />
       <TextInput variant="outlined" label="Subreddit" style={{ margin: 16 }} />   
       <TextInput variant="outlined" label="Content" style={{ margin: 16 }} multiline = {true} numberOfLines = {15}/> 
       <Button style={styles.button} title="Submit" />    
    </Stack>
  );
  
  export default NewReddit;

  const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: '#444444',
        color: '#EEEEEE',
        width: '30%',
        alignSelf: 'center'
    },
  });