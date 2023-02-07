import { StyleSheet, Button, View } from 'react-native';

export default function Home(props) {

    const getCategoryName = (category) => {
        return `${category.name} ${category.notes.length}`
    }

    return (
        <View>
            {props.categories.map((category, index) => (
                <Button key={index.toString()} title={getCategoryName(category)} onPress={() => {
                    props.clickOnCategory(category)
                }}></Button>)
            )}
            <Button title="add" onPress={() => {
                props.addCategory()
            }}></Button>
        </View>
    );
}
