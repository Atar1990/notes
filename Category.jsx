import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

export default function Category(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{props.category.name}</Text>
            {
                props.category.notes.map((note, index) => (
                    <TouchableOpacity style={styles.note} key={index.toString()} onPress={() => {
                        props.clickOnNote(note);
                    }}>
                        <Text>{note.text}</Text>
                    </TouchableOpacity>
                ))
            }
            <View style={styles.footer}>
                <Button icon="card-plus-outline" mode="contained" onPress={() => {
                    props.createNewNote();
                }}>Add</Button>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 20,
        marginTop: 50
    },
    note: { backgroundColor: "#f5f5f5", padding: 20, marginBottom: 20 },
    container: { width: '80%' },
    footer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }
});