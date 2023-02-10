import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


export default function Home(props) {

    const getCategoryName = (category) => {
        return `${category.name} ${category.notes.length}`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notes</Text>
            {props.categories.map((category, index) => (
                <TouchableOpacity key={index.toString()} style={styles.category} onPress={() => {
                    props.clickOnCategory(category)
                }
                }>
                    <Text style={styles.text}>{getCategoryName(category)}</Text>
                </TouchableOpacity>
            )
            )}
            <Button icon="camera" mode="contained" onPress={() => {
                props.addCategory()
            }}>Add</Button>
        </View>
    );
}


const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: '700'
    },
    category: { backgroundColor: "#f5f5f5", padding: 20, marginBottom: 20 },
    container: { width: '80%', marginTop: 50 },
    header: {
        fontSize: 50,
        fontWeight: '700',
        color: '#555f6f',
        marginBottom: 20
    }
});