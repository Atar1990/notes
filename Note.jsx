import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Button } from 'react-native';

export default function Note(props) {

    const [text, onChangeText] = React.useState(props.note.text);


    return (
        <View>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
            </SafeAreaView>
            <Button title="save" onPress={() => {
                props.saveNote(text)
            }}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
