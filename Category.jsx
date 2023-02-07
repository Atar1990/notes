import { StyleSheet, View, Button, Text } from 'react-native';

export default function Category(props) {
    return (
        <View>
            <Button title="back" onPress={() => {
                props.backClick();
            }}></Button>
            <Text>{props.category.name}</Text>
            {
                props.category.notes.map((note, index) => (
                    <Button key={index.toString()} title={note.text} onPress={() => {
                        props.clickOnNote(note);
                    }}></Button>
                ))
            }
            <Button title="add" onPress={() => {
                props.createNewNote();
            }}></Button>
        </View>
    );
}

