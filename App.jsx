import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import Home from './Home';
import Category from './Category';
import Note from './Note';
import NewCategory from './NewCategory'
import { createId } from './helper'
// import { AsyncStorage } from '@react-native-async-storage/async-storage';


const defState = {
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
    setState({
      ...state,
      currentPage: 'category',
      categories: newCategories
    })
    storeData();
  }

  const addCategory = (text) => {
    const newCategory = {
      id: createId(),
      name: text,
      notes: []
    };
    const newCategories = [...state.categories, newCategory];
    setState({
      ...state,
      categories: newCategories,
      currentPage: 'home'
    })
    storeData();
  }

  const clickCategory = category => {
    setState({
      ...state,
      currentPage: 'category',
      currentCategory: category.id
    })
  }

  const backClick = () => {
    setState({
      ...state,
      currentPage: "home"
    })
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
    storeData();
  }

  const clickOnNote = note => {
    setState({
      ...state,
      currentPage: 'note',
      currentNote: note.id
    })
  }

  const getCurrentCategory = () => {
    return state.categories.find(c => c.id === state.currentCategory)
  }

  const deleteNote = () => {
    const newCategories = [...state.categories];
    const category = newCategories.find(c => c.id === state.currentCategory);
    const index = category.notes.findIndex(n => n.id === state.currentNote);
    category.notes.splice(index, 1);
    setState({
      ...state,
      currentPage: 'category',
      categories: newCategories
    })
    storeData();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {state.currentPage === 'home' && (
        <Home
          categories={state.categories}
          addCategory={() => {
            setState({
              ...state,
              currentPage: 'newCategory'
            })
          }}
          clickOnCategory={(category) => { clickCategory(category) }}></Home>
      )}
      {state.currentPage === 'category' && (
        <Category
          category={getCurrentCategory()}
          backClick={() => { backClick() }}
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
