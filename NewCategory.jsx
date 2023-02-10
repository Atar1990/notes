import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function NewCategory(props) {

    const [text, onChangeText] = React.useState('');


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Category name"
                />
            </SafeAreaView>
            <Button icon="content-save" mode="contained" onPress={() => {
                if (text) {
                    props.categoryName(text)
                }
            }}>save</Button>
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
    container: {
        marginTop: 50
    }
});
