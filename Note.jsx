import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Button } from 'react-native';

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
                <Button title="save" onPress={() => {
                    if (text) {
                        props.saveNote(text)
                    }
                }}></Button>
                <Button color="red" title="delete" onPress={() => {
                    props.deleteNote()
                }}></Button>
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
