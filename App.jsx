import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import Home from './Home';
import Category from './Category';
import Note from './Note';
import NewCategory from './NewCategory'
import { createId } from './helper'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const defState = {
  history: [],
  currentPage: 'home',
  currentCategory: {},
  currentNote: {},
  categories: [{
    id: "1",
    name: "Work",
    notes: [{
      id: '1',
      text: "New note"
    }],
  }]
}

export default function App() {

  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem('@storage_Key', jsonValue)
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // }

  const [state, setState] = useState(defState);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getData();
  //     if (data) {
  //       setState(data);
  //     }
  //   }
  //   fetchData()
  //     .catch(console.error);
  // }, [])

  const getNote = () => {
    const category = state.categories.find(c => c.id === state.currentCategory);
    const note = category.notes.find(n => n.id === state.currentNote);
    return note;
  }

  const saveNote = text => {
    const newCategories = [...state.categories];
    const category = newCategories.find(c => c.id === state.currentCategory);
    const note = category.notes.find(n => n.id === state.currentNote);
    note.text = text;
    const newState = {
      ...state,
      currentPage: 'category',
      categories: newCategories
    };
    newState.history.push('notes')
    setState(newState)
  }

  const addCategory = (text) => {
    const newCategory = {
      id: createId(),
      name: text,
      notes: []
    };
    const newCategories = [...state.categories, newCategory];
    const newState = {
      ...state,
      categories: newCategories,
      currentPage: 'home'
    }
    newState.history.pop();
    setState(newState)
  }

  const clickCategory = category => {
    const newState = {
      ...state,
      currentPage: 'category',
      currentCategory: category.id
    };
    newState.history.push('home')
    setState(newState)
  }

  const newNote = () => {
    const newCategories = [...state.categories];
    const category = newCategories.find(c => c.id === state.currentCategory);
    category.notes.push({
      id: createId(),
      text: 'new note'
    })
    setState({
      ...state,
      categories: newCategories
    })
  }

  const clickOnNote = note => {
    const newState = {
      ...state,
      currentPage: 'note',
      currentNote: note.id
    }
    newState.history.push('category')
    setState(newState)
  }

  const getCurrentCategory = () => {
    return state.categories.find(c => c.id === state.currentCategory)
  }

  const deleteNote = () => {
    const newCategories = [...state.categories];
    const category = newCategories.find(c => c.id === state.currentCategory);
    const index = category.notes.findIndex(n => n.id === state.currentNote);
    category.notes.splice(index, 1);
    const newState = {
      ...state,
      currentPage: 'category',
      categories: newCategories
    };
    newState.history.pop();
    setState(newState)
  }

  const backToLastPage = () => {
    setState({
      ...state,
      currentPage: state.history.pop()
    })
  }

  const addCategoryPage = () => {
    const newState = {
      ...state,
      currentPage: 'newCategory'
    };
    newState.history.push('home')
    setState(newState)
  }

  const getLastPageTitle = () => {
    const title = state.history[state.history.length - 1];
    return title && (title[0].toUpperCase() + title.slice(1))
  }

  return (
    <PaperProvider theme={theme}>
      <Appbar.Header style={[
        {
          backgroundColor: theme.colors.primary,
        },
      ]}>
        {state.currentPage !== 'home' && <Appbar.BackAction onPress={() => { backToLastPage() }} />}
        <Appbar.Content title={getLastPageTitle()} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        {state.currentPage === 'home' && (
          <Home
            categories={state.categories}
            addCategory={() => { addCategoryPage() }}
            clickOnCategory={(category) => { clickCategory(category) }}></Home>
        )}
        {state.currentPage === 'category' && (
          <Category
            category={getCurrentCategory()}
            createNewNote={() => { newNote() }}
            clickOnNote={(note) => { clickOnNote(note) }}></Category>
        )}
        {state.currentPage === 'note' && (
          <Note
            note={getNote()}
            deleteNote={() => { deleteNote() }}
            saveNote={(text) => { saveNote(text) }}></Note>
        )}
        {state.currentPage === 'newCategory' && (
          <NewCategory
            categoryName={(text) => { addCategory(text) }}></NewCategory>
        )}
        <StatusBar style="auto" />
      </ScrollView>
    </PaperProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
});
