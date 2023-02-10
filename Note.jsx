import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Note(props) {

    const [text, onChangeText] = React.useState(props.note.text);


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
            </SafeAreaView>
            <View style={styles.footer}>
                <Button icon="content-save" mode="contained" onPress={() => {
                    if (text) {
                        props.saveNote(text)
                    }
                }}>Save</Button>
                <Button icon="delete-outline" mode="outlined" onPress={() => {
                    props.deleteNote()
                }}>Delete</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 250,
        marginVertical: 20,
        borderWidth: 1,
        padding: 30,
        textAlignVertical: 'top'
    },
    container: {
        width: '80%',
        marginTop: 20
    },
    footer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }
});
